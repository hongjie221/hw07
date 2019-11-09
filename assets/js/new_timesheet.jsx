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
      return <div><Alert variant="danger">{error}</Alert>
      <p>Refresh to try to submit again</p></div>
    }
    else {
    this.state.allJobCode = this.props.allJobCode;

    return (
      <div>
        <h1>New Time Sheet</h1>
        {error_msg}
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(0, e)}
          hourChange={e => this.handleHourChange(0, e)}
          descriptionChange={e => this.handleDescriptionChange(0, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(1, e)}
          hourChange={e => this.handleHourChange(1, e)}
          descriptionChange={e => this.handleDescriptionChange(1, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(2, e)}
          hourChange={e => this.handleHourChange(2, e)}
          descriptionChange={e => this.handleDescriptionChange(2, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(3, e)}
          hourChange={e => this.handleHourChange(3, e)}
          descriptionChange={e => this.handleDescriptionChange(3, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(4, e)}
          hourChange={e => this.handleHourChange(4, e)}
          descriptionChange={e => this.handleDescriptionChange(4, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(5, e)}
          hourChange={e => this.handleHourChange(5, e)}
          descriptionChange={e => this.handleDescriptionChange(5, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(6, e)}
          hourChange={e => this.handleHourChange(6, e)}
          descriptionChange={e => this.handleDescriptionChange(6, e)}
        />
        <SheetInfo
          allJobCode={this.state.allJobCode}
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(7, e)}
          hourChange={e => this.handleHourChange(7, e)}
          descriptionChange={e => this.handleDescriptionChange(7, e)}
        />

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
  }}
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
