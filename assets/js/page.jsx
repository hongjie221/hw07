import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import { Navbar, Nav, Col } from "react-bootstrap";
import { Provider, connect } from "react-redux";
import ManagerLogin from "./manager_login";
import NewTimesheet from "./new_timesheet";
import WorkerLogin from "./worker_login";
import ShowSheet from "./show_timesheet";

import store from "./store";

export default function init_page(root) {
  let tree = (
    <Provider store={store}>
      <Page />
    </Provider>
  );
  ReactDOM.render(tree, root);
}

function Page(props) {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Col md="12">
          <Session />
        </Col>
      </Navbar>

      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>

        <Route exact path="/managers">
          <h1>
            <ManagerLogin />
          </h1>
        </Route>

        <Route exact path="/workers">
          <h1>
            <WorkerLogin />
          </h1>
        </Route>

        <Route exact path="/new_timesheet">
          <h1>
            <NewTimesheet />
          </h1>
        </Route>
        <Route exact path="/sheets/show">
          <h1>
            <ShowSheet />
          </h1>
        </Route>
      </Switch>
    </Router>
  );
}

let Session = connect(({ session }) => ({ session }))(
  ({ session, dispatch }) => {
    function logout(ev) {
      ev.preventDefault();
      localStorage.removeItem("session");
      dispatch({
        type: "LOG_OUT"
      });
    }
    if (session) {
      if (session.worker_id) {
        return (
          <Nav>
            <Nav.Item>
              <p className="text-light py-2">Worker: {session.worker_name}</p>
            </Nav.Item>
            <Nav.Item>
              <a className="nav-link" href="#" onClick={logout}>
                Logout
              </a>
            </Nav.Item>
          </Nav>
        );
      } else {
        return (
          <Nav>
            <Nav.Item>
              <p className="text-light py-2">Manager: {session.manager_name}</p>
            </Nav.Item>
            <Nav.Item>
              <a className="nav-link" href="#" onClick={logout}>
                Logout
              </a>
            </Nav.Item>
          </Nav>
        );
      }
    } else {
      return (
        <Nav>
          <Nav.Item>
            <NavLink
              to="/managers"
              exact
              activeClassName="active"
              className="nav-link"
            >
              Manager Login
            </NavLink>
            <NavLink
              to="/workers"
              exact
              activeClassName="active"
              className="nav-link"
            >
              Worker Login
            </NavLink>
          </Nav.Item>
        </Nav>
      );
    }
  }
);
