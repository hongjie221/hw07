import { createStore, combineReducers } from "redux";
import deepFreeze from "deep-freeze-strict";

function manager_login(
    st0 = { manager_email: "", manager_password: "", errors: null },
    action
) {
    switch (action.type) {
        case "MANAGER_LOGIN":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function worker_login(
    st0 = { worker_email: "", worker_password: "", error: null },
    action
) {
    switch (action.type) {
        case "WORKER_LOGIN":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function new_sheet(
    st0 = {
        allJobCode: null,
        current_worker_id: -1,
        job_code: [],
        hour: [],
        description: [],
        date: "",
        error: null
    },
    action
) {
    switch (action.type) {
        case "NEW_TIMESHEET":
            console.log(Object.assign({}, st0, action.data));
            return Object.assign({}, st0, action.data);
        case "ADD_JOBCODE":
            let jobcodes = [];
            for (let j of action.data) {
                jobcodes.push(j.jobcode);
            }
            return Object.assign({}, st0, { allJobCode: jobcodes });
        default:
            return st0;
    }
}

function all_sheet(
    st0 = { date: [], worker_id: [], id: [], status: [], job_code: [], hour: [], note: [], error: null },
    action
) {
    switch (action.type) {
        case "SHOW_SHEET":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}

function all_worker_sheet(
    st0 = { date: [], worker_id: [], id: [], status: [], job_code: [], hour: [], note: [], error: null },
    action
) {
    switch (action.type) {
        case "SHOW_ALL_WORKER_SHEET":
            return Object.assign({}, st0, action.data);
        default:
            return st0;
    }
}


let session0 = localStorage.getItem("session");
if (session0) {
    session0 = JSON.parse(session0);
}

function session(st0 = session0, action) {
    switch (action.type) {
        case "LOG_IN":
            return action.data;
        case "LOG_OUT":
            return null;
        default:
            return st0;
    }
}

function root_reducer(st0, action) {
    console.log("root_reducer", st0, action);
    let reducer = combineReducers({
        manager_login,
        worker_login,
        session,
        new_sheet,
        all_sheet,
        all_worker_sheet
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;