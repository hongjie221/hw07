import React from "react";
import ReactDOM from "react-dom";
import Select from "react-select";
import { connect } from "react-redux";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";

import { submit_new_time_sheet } from "./ajax";
import { all_job_code } from "./ajax";
import _ from "lodash";

class NewTimesheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allJobCode: this.props.allJobCode,
      current_worker_id: JSON.parse(localStorage.getItem("session")).worker_id,
      hour: ["0", "0", "0", "0", "0", "0", "0", "0"],
      job_code: ["", "", "", "", "", "", "", ""],
      description: ["", "", "", "", "", "", "", ""],
      date: "",
      numOfRow: 1,
      redirect: null
    };
    this.changed = this.changed.bind(this);
  }

  redirect(path) {
    this.setState({
      redirect: path
    });
  }

  changed(data) {
    this.props.dispatch({
      type: "NEW_TIMESHEET",
      data: data
    });
    console.log(data);
  }

  handleDateChange(event) {
    let date = event.target.value;
    this.setState({ date: date });
  }

  handleJobCodeChange(i, event) {
    let job_code_t = this.state.job_code;
    job_code_t[i] = event.value;
    this.setState({ job_code: job_code_t }, () => console.log(this.state));
  }

  handleHourChange(i, event) {
    let hour_t = this.state.hour;
    hour_t[i] = event.target.value;
    this.setState({ hour: hour_t }, () => console.log(this.state));
  }

  handleDescriptionChange(i, event) {
    let des_t = this.state.description;
    des_t[i] = event.target.value;
    this.setState({ description: des_t }, () => console.log(this.state));
  }

  handlePlus() {
    if (this.state.numOfRow < 8) {
      this.setState({ numOfRow: this.state.numOfRow + 1 });
    }
  }
  handleMinus() {
    if (this.state.numOfRow > 1) {
      this.setState({ numOfRow: this.state.numOfRow - 1 });
    }
  }

  table() {
    let t = [];
    for (let i = 0; i < this.state.numOfRow; i++) {
      t.push(
        <div>
          <SheetInfo
            allJobCode={this.state.allJobCode}
            job_code={this.state.job_code}
            jobCodeChange={e => this.handleJobCodeChange(i, e)}
            hourChange={e => this.handleHourChange(i, e)}
            descriptionChange={e => this.handleDescriptionChange(i, e)}
          />
        </div>
      );
    }
    return t;
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }

    if (!this.props.allJobCode) {
      all_job_code();
      return <p>React Loading</p>;
    }

    let { job_code, hour, description, error } = this.props;

    let error_msg = null;
    console.log(error);
    if (error) {
      return (
        <div>
          <Alert variant="danger">{error}</Alert>
          <p>Refresh to try to submit again</p>
        </div>
      );
    } else {
      this.state.allJobCode = this.props.allJobCode;

      return (
        <div>
          <h1>New Time Sheet</h1>
          {error_msg}
          <div>{this.table()}></div>
          <button onClick={() => this.handlePlus()}>+</button>
          <button onClick={() => this.handleMinus()}>-</button>

          <Form.Group controlId="job_code1">
            <Row>
              <Col md="4">
                <Form.Label style={{ fontSize: "20px" }}>
                  Date(yyyy-mm-dd)
                </Form.Label>
              </Col>
              <Col>
                <input
                  id="input"
                  type="date"
                  className="form_control mr-sm-2"
                  onChange={e => this.handleDateChange(e)}
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="submit">
            <Button
              variant="primary"
              onClick={() => {
                this.changed({
                  job_code: this.state.job_code,
                  hour: this.state.hour,
                  description: this.state.description,
                  date: this.state.date,
                  current_worker_id: this.state.current_worker_id
                });
                submit_new_time_sheet(this);
              }}
            >
              Submit
            </Button>
          </Form.Group>
        </div>
      );
    }
  }
}

function SheetInfo(params) {
  let {
    allJobCode,
    job_code,
    jobCodeChange,
    hourChange,
    descriptionChange
  } = params;
  allJobCode = _.map(allJobCode, o => {
    return { value: o, label: o };
  });
  return (
    <Form.Row>
      <Form.Group as={Col} controlId="job_code1">
        <Form.Label style={{ fontSize: "20px" }}>Job Code</Form.Label>

        <Select
          className="select"
          options={allJobCode}
          onChange={jobCodeChange}
          style={{ size: "20px" }}
        />
      </Form.Group>
      <Form.Group as={Col} controlId="hour1">
        <Form.Label style={{ fontSize: "20px" }}>Job Hour</Form.Label>

        <Form.Control type="text" onChange={hourChange} />
      </Form.Group>
      <Form.Group as={Col} controlId="description1">
        <Form.Label style={{ fontSize: "20px" }}>Description</Form.Label>

        <Form.Control type="text" onChange={descriptionChange} />
      </Form.Group>
    </Form.Row>
  );
}

function state2props(state) {
  return state.new_sheet;
}

export default connect(state2props)(NewTimesheet);
