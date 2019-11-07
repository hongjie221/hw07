import React from "react";
import ReactDOM from "react-dom";

import { connect } from "react-redux";
import { Form, Button, Alert, Col, Row } from "react-bootstrap";
import { Redirect } from "react-router";

import { submit_new_time_sheet } from "./ajax";
import { all_job_code } from "./ajax";


class NewTimesheet extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allJobCode: props.allJobCode,
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
    this.setState({date: date});
  }


  handleJobCodeChange(i, event) {
    let job_code_t = this.state.job_code;
    job_code_t[i] = event.target.value;
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

    let { job_code, hour, description, errors } = this.props;
    let error_msg = null;
    if (errors) {
      error_msg = <Alert variant="danger">{errors}</Alert>;
    }
    return (
      <div>
        <h1>New Time Sheet</h1>
        {error_msg}
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(0, e)}
          hourChange={e => this.handleHourChange(0, e)}
          descriptionChange={e => this.handleDescriptionChange(0, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(1, e)}
          hourChange={e => this.handleHourChange(1, e)}
          descriptionChange={e => this.handleDescriptionChange(1, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(2, e)}
          hourChange={e => this.handleHourChange(2, e)}
          descriptionChange={e => this.handleDescriptionChange(2, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(3, e)}
          hourChange={e => this.handleHourChange(3, e)}
          descriptionChange={e => this.handleDescriptionChange(3, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(4, e)}
          hourChange={e => this.handleHourChange(4, e)}
          descriptionChange={e => this.handleDescriptionChange(4, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(5, e)}
          hourChange={e => this.handleHourChange(5, e)}
          descriptionChange={e => this.handleDescriptionChange(5, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(6, e)}
          hourChange={e => this.handleHourChange(6, e)}
          descriptionChange={e => this.handleDescriptionChange(6, e)}
        />
        <SheetInfo
          job_code={this.state.job_code}
          jobCodeChange={e => this.handleJobCodeChange(7, e)}
          hourChange={e => this.handleHourChange(7, e)}
          descriptionChange={e => this.handleDescriptionChange(7, e)}
        />

        <Form.Group controlId="job_code1">
        <Row>
          <Col md="4">
            <Form.Label style={{ fontSize: "20px" }}>Date(yyyy-mm-dd)</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" onChange={(e) => this.handleDateChange(e)} />
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

function SheetInfo(params) {
  let { job_code, jobCodeChange, hourChange, descriptionChange } = params;
  return (
    <Row>
      <Form.Group controlId="job_code1">
        <Row>
          <Col md="4">
            <Form.Label style={{ fontSize: "20px" }}>Job Code</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" onChange={jobCodeChange} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="hour1">
        <Row>
          <Col md="4">
            <Form.Label style={{ fontSize: "20px" }}>Job Hour</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" onChange={hourChange} />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group controlId="description1">
        <Row>
          <Col md="4">
            <Form.Label style={{ fontSize: "20px" }}>Description</Form.Label>
          </Col>
          <Col>
            <Form.Control type="text" onChange={descriptionChange} />
          </Col>
        </Row>
      </Form.Group>
    </Row>
  );
}

function state2props(state) {
  return state.new_sheet;
}

export default connect(state2props)(NewTimesheet);
