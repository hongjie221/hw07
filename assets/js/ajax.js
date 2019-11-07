import store from "./store";
import NewSheet from "./new_timesheet"

export function post(path, body) {
    let state = store.getState();
    //let token = state.session.token;
    let token = "";
    if (state.session) {
        token = state.session.token;
    }
    return fetch("/ajax" + path, {
        method: "post",
        credentials: "same-origin",
        headers: new Headers({
            "x-csrf-token": window.csrf_token,
            "content-type": "application/json; charset=UTF-8",
            accept: "application/json",
            "x-auth": token || ""
        }),
        body: JSON.stringify(body)
    }).then(resp => resp.json());
}

export function get(path) {
    let state = store.getState();
    let token = state.session.token;

    return fetch('/ajax' + path, {
        method: 'get',
        credentials: 'same-origin',
        headers: new Headers({
            'x-csrf-token': window.csrf_token,
            'content-type': "application/json; charset=UTF-8",
            'accept': 'application/json',
            'x-auth': token || "",
        }),
    }).then((resp) => resp.json());
}

export function all_job_code() {
    get("/jobs").then(resp => {
        store.dispatch({
            type: 'ADD_JOBCODE',
            data: resp.data,
        })
    })
}

export function worker_submit_login(form) {
    let state = store.getState();
    let data = state.worker_login;
    console.log(data);
    post("/sessions", data).then(resp => {
        if (resp.token) {
            localStorage.setItem("session", JSON.stringify(resp));
            store.dispatch({
                type: "LOG_IN",
                data: resp
            });
            form.redirect("/new_timesheet");
        } else {
            store.dispatch({
                type: "WORKER_LOGIN",
                data: { errors: JSON.stringify(resp.errors) }
            });
        }
    });
}

export function submit_login(form) {
    let state = store.getState();
    let data = state.manager_login;
    session = localStorage.getItem("session");
    console.log(session);

    post("/sessions", data).then(resp => {
        if (resp.token) {
            localStorage.setItem("session", JSON.stringify(resp));
            store.dispatch({
                type: "LOG_IN",
                data: resp
            });
            form.redirect("/");
        } else {
            store.dispatch({
                type: "MANAGER_LOGIN",
                data: { errors: JSON.stringify(resp.errors) }
            });
        }
    });
}

export function submit_new_time_sheet(form) {
    let state = store.getState();
    let data = state.new_sheet;
    console.log("data:")
    console.log(data);
    post("/sheets", data).then(resp => {
        if (resp.token) {
            store.dispatch({
                type: "NEW_TIMESHEET",
                data: resp
            });
            form.redirect("/sheets/show");
        } else {
            store.dispatch({
                type: "NEW_TIMESHEET",
                data: { errors: JSON.stringify(resp.errors) }
            });
        }
    });
}