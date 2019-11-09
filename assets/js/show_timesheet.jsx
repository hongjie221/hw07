import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Table, Alert} from "react-bootstrap";
import { Redirect } from "react-router";
import { get_sheet } from "./ajax";

class ShowTimeSheet extends React.Component {
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
    if (date.length === 0) {
      let current_worker_id = JSON.parse(localStorage.getItem("session"))
        .worker_id;
      get_sheet(current_worker_id);
      return (
        <div>
          <h1>Show Sheet</h1>
          <p>Loading...</p>
        </div>
      );
    }
    let error_msg = null;
    console.log(error)
    if (error) {
      error_msg = <Alert variant="danger">{error}</Alert>;
    }

    

    //this.renderTableData();
    console.log(Array.isArray(job_code));
    return (
      <div>
      {error_msg}
      <Table>
        {date.map((x, i) => (
          <div>
            <thead>
              <tr>
              <th>Date:{x}</th> 
              <th>Status:{status[i] == true ? "Approved" : "Not Approved" }</th> 
              <th>worker_id:{worker_id[i]}</th>
              </tr>
            </thead>
            {job_code[i].map((y, j) => {
              return <tbody>
                <tr>
                  <td>JobCode:{job_code[i][j]}</td>
                  <td>Hour: {hour[i][j]}</td>
                  <td>Note:{note[i][j]}</td>
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
function state2props(state) {
  return state.all_sheet;
}

export default connect(state2props)(ShowTimeSheet);
