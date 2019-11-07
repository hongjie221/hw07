import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";
import {get_sheet} from "./ajax"

class ShowTimeSheet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: null
        }
    }

    redirect(path) {
        this.setState({
          redirect: path
        });
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }

        let {date, status, worker_id, id} = this.props;
        if (date.length === 0) {
            let current_worker_id = JSON.parse(localStorage.getItem("session")).worker_id;
            get_sheet(current_worker_id);
            return (
                <div>
                  <h1>Show Sheet</h1>
                  <p>Loading...</p>
                </div>
              );
        }
        let table = date.map(x => )
        
        return (
            <div>
              <h1>Show sheet</h1>
              <h2>{date[0]}</h2>
            </div>
          );
    }
}
function state2props(state) {
    return state.all_sheet;
}

function TableContent() {

}
  
export default connect(state2props)(ShowTimeSheet);