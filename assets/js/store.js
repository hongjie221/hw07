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
    st0 = { allJobCode: [], job_code: [], hour: [], description: [], error: null },
    action
) {
    console.log("action")
    console.log(action);
    switch (action.type) {
        case "NEW_TIMESHEET":
            return Object.assign({}, st0, action.data);
        case "ADD_JOBCODE":
            console.log("add jobcode")
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
        new_sheet
    });
    return deepFreeze(reducer(st0, action));
}

let store = createStore(root_reducer);
export default store;