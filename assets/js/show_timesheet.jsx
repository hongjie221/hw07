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

    renderTableData() {
        let {date, status, worker_id, id, job_code, hour, desc} = this.props;
        if (date) {
            return  date.map((x, i)=> {
                
                {this.renderTask(i)}
            })
        }
    }

    renderTask(i) {
        let {date, status, worker_id, id, job_code, hour, desc} = this.props;
        let code = job_code[i];
        let note = desc[i];
        console.log(code);
        if (hour) {

            return hour.map((x, i) => <p> JobCode: {code[i]}, Hour: {x}, Note:  </p>)
            
        }
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        let {date, status, worker_id, id, job_code, hour, desc} = this.props;

        let value = [];

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

       
        //this.renderTableData();
        
        return (
              <div>
                  {
                      date.map((x, i) => {
                        <p>Date: {x}, Status: {status[i]}, worker_id: {worker_id[i]}</p>
                        {
                           job_code[i].map((y, j) => {
                               return <p> JobCode: {y[j]}, Hour: {hour[i][j]}, Note:  </p>

                           })
                        }
                      })
                  }
              </div>
            
          )
    }
}
function state2props(state) {
    return state.all_sheet;
}

  
export default connect(state2props)(ShowTimeSheet);