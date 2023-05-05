import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import api from "../services/api"

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

export default class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.handleSchedule = this.handleSchedule.bind(this);
    this.onChangeScheduleDate = this.onChangeScheduleDate.bind(this);
    this.onChangeScheduleDoctor = this.onChangeScheduleDoctor.bind(this);

    this.state = {
      scheduleDoctor: "",
      scheduleDate: "",
      doctors: [],
      successful: false,
      message: ""
    };
  }

  componentDidMount() {
    api.get("/doctor/all").then(response => {
      this.setState({
        doctors: response.data
      });
    });
  }
  

  onChangeScheduleDate(e) {
    this.setState({
        scheduleDate: e.target.value
    });
  }
  onChangeScheduleDoctor(e) {
    this.setState({
        scheduleDoctor: e.target.value
    });
  }

  handleSchedule(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        api.post("schedule/create", {
            doctorId: this.state.scheduleDoctor,
          scheduleDate: new Date(this.state.scheduleDate).toISOString()
        }).then(
        () => {
          this.props.history.push("/");
          window.location.reload();
        },
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-12">
        <div className="card card-container">
          <Form
            onSubmit={this.handleSchedule}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                    <label htmlFor="scheduleDoctor">Doctor</label>
                    <select 
                    className="form-control"
                    name="scheduleDoctor"
                    value={this.state.scheduleDoctor}
                    onChange={this.onChangeScheduleDoctor}
                    required
                    >
                      <option value="">Select a doctor</option>
                      {this.state.doctors.map(doctor => (
                        <option key={doctor.doctorId} value={doctor.doctorId}>
                          {doctor.doctorName}
                        </option>
                      ))}
                      </select>
                  </div>

                <div className="form-group">
                  <label htmlFor="scheduleDate">Schedule Date</label>
                  <Input
                    type="datetime-local"
                    className="form-control"
                    name="scheduleDate"
                    value={this.state.scheduleDate}
                    onChange={this.onChangeScheduleDate}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add Schedule</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

