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
                data: resp.data
            })
        })
        /* get("/jobs").then(resp => {
                 store.dispatch({
                     type: 'ADD_JOBCODE',
                     data: resp.data,
                 })
             })*/
        /*get("/jobs").then(resp => {
            console.log(resp.data)
            return resp.data;
        })*/
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

export function get_sheet(current_worker_id) {
    get("/sheets/" + current_worker_id).then(resp => {
        let date = resp.data.map(item => item.date);
        let worker_id = resp.data.map(item => item.worker_id);
        let status = resp.data.map(item => item.status);
        let id = resp.data.map(item => item.id);
        let job_code = resp.data.map(item => item.job_code);
        let hour = resp.data.map(item => item.hour);
        let desc = resp.data.map(item => desc);
        console.log(resp.data);
        if (resp.data) {
            store.dispatch({
                type: "SHOW_SHEET",
                data: {
                    date: date,
                    worker_id,
                    worker_id,
                    status: status,
                    id: id,
                    job_code: job_code,
                    hour: hour,
                    desc: desc
                },
            });
        } else {
            store.dispatch({
                type: "NEW_TIMESHEET",
                data: { errors: JSON.stringify(resp.errors) }
            });
        }
    })
}

export function submit_new_time_sheet(form) {
    let state = store.getState();
    let data = state.new_sheet;
    post("/sheets", data).then(resp => {
        let date = resp.data.map(item => item.date);
        let worker_id = resp.data.map(item => item.worker_id);
        let status = resp.data.map(item => item.status);
        let id = resp.data.map(item => item.id);
        let job_code = resp.data.map(item => item.job_code);
        let hour = resp.data.map(item => item.hour);
        let desc = resp.data.map(item => desc);
        console.log(resp.data);
        if (resp.data) {
            store.dispatch({
                type: "SHOW_SHEET",
                data: {
                    date: date,
                    worker_id,
                    worker_id,
                    status: status,
                    id: id,
                    job_code: job_code,
                    hour: hour,
                    desc: desc
                },
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