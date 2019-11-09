import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Table, Alert, Button} from "react-bootstrap";
import { Redirect } from "react-router";
import { get_all_worker_sheet } from "./ajax";
import {approveSheet} from "./ajax";
class WorkerTimeSheets extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  redirect(path) {
    this.setState({
      redirect: path
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    let { date, status, worker_id, id, job_code, hour, note , error} = this.props;
    console.log(this.props)
    if (!date) {
      let current_manager_id = JSON.parse(localStorage.getItem("session"))
        .manager_id;
      get_all_worker_sheet(current_manager_id);
      return (
        <div>
          <h1>Show Sheet</h1>
          <p>Loading...</p>
        </div>
      );
    }
    let error_msg = null;
  
    if (error) {
      error_msg = <Alert variant="danger">{error}</Alert>;
    }

    

    //this.renderTableData();
    return (
      <div>
      {error_msg}
      <Table>
        {date.map((x, i) => (
          <div>
            <thead>
              <th>Date: {x}</th> 
              <th>Status: {status[i] == true ? "Approved" : "Not Approved" }</th> 
              <th>worker_Name: {worker_id[i]}</th>
              <ApproveButton status={status[i]} id={id[i]} />
            </thead>
            {job_code[i].map((y, j) => {
              return <tbody>
                <tr>
                  {" "}
                  <td>JobCode: {job_code[i][j]}</td> <td>Hour: {hour[i][j]}</td><td> Note:{note[i][j]}</td>
              </tr>
              </tbody>;
            })}
          </div>
        ))}
      </Table>
      </div>
    );
  }
}

function ApproveButton(params) {

  let {status, id} = params
  let current_manager_id = JSON.parse(localStorage.getItem("session")).manager_id
  console.log(current_manager_id)
  if (!status) {
    return (<th><Button variant="primary" id={id} onClick={(e) => approveSheet(current_manager_id, e.target.id)}>
    Approve
  </Button></th>)
  }
  else {
    return null
  }
}

function state2props(state) {
  return state.all_worker_sheet;
}

export default connect(state2props)(WorkerTimeSheets);
