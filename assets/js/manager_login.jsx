import React from 'react';
import ReactDOM from 'react-dom';

import { connect } from 'react-redux';
import { Form, Button, Alert } from 'react-bootstrap';
import { Redirect } from 'react-router';

import { submit_login } from './ajax';

class ManagerLogin extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null,
        };
    }

    redirect(path) {
        this.setState({
            redirect: path,
        });
    }

    changed(data) {
        this.props.dispatch({
            type: 'MANAGER_LOGIN',
            data: data,
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {manager_email, manager_password, errors} = this.props;
        let error_msg = null;
        if (errors) {
            error_msg = <Alert variant="danger">{ errors }</Alert>
        }
        return (
            <div>
              <h1>Manager Log In</h1>
              { error_msg }
              <Form.Group controlId="manager_email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={
                  (ev) => this.changed({manager_email: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="manager_password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={
                  (ev) => this.changed({manager_password: ev.target.value})} />
              </Form.Group>
              <Form.Group controlId="submit">
                <Button variant="primary" onClick={() => submit_login(this)}>
                  Log in
                </Button>
              </Form.Group>
            </div>
          );
    }
}

function state2props(state) {
    return state.manager_login;
}

export default connect(state2props)(ManagerLogin);