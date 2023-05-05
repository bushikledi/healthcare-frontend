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
const amountValidation = value => {
  if (!value || value<0) {
    return (
      <div className="alert alert-danger" role="alert">
        Value most be positive and not not blank!
      </div>
    );
  }
};

export default class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.handleDoctor = this.handleDoctor.bind(this);
    this.onChangeDoctorName = this.onChangeDoctorName.bind(this);
    this.onChangeDoctorSpeciality = this.onChangeDoctorSpeciality.bind(this);
    this.onChangeDoctorAbout = this.onChangeDoctorAbout.bind(this);
    this.onChangeAmount = this.onChangeAmount.bind(this);


    this.state = {
      doctorName: "",
      doctorSpeciality: "",
      doctorAbout: "",
      successful: false,
      message: "",
      amount: 0
    };
  }
  

  onChangeDoctorName(e) {
    this.setState({
        doctorName: e.target.value
    });
  }
  onChangeAmount(e) {
    this.setState({
        amount: e.target.value
    });
  }
  onChangeDoctorAbout(e) {
    this.setState({
        doctorAbout: e.target.value
    });
  }
  onChangeDoctorSpeciality(e) {
    this.setState({
        doctorSpeciality: e.target.value
    });
  }
  handleDoctor(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
        api.post("doctor/add", {
            doctorName: this.state.doctorName,
            doctorAbout: this.state.doctorAbout,
            doctorSpeciality: this.state.doctorSpeciality,
            amount: this.state.amount
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
            onSubmit={this.handleDoctor}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="doctorName">Doctor Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="doctorName"
                    value={this.state.doctorName}
                    onChange={this.onChangeDoctorName}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="doctorAbout">Doctor About</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="doctorAbout"
                    value={this.state.doctorAbout}
                    onChange={this.onChangeDoctorAbout}
                    validations={[required]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="amount">Doctor's Price</label>
                  <Input
                    type="number"
                    className="form-control"
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onChangeAmount}
                    validations={[amountValidation]}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="doctorSpeciality">Doctor Speciality</label>
                  <select
                   className="form-control"
                   name="doctorSpeciality"
                   value={this.state.doctorSpeciality}
                   onChange={this.onChangeDoctorSpeciality}
                   required
                   >
                    <option value="">Select Speciality</option>
                    <option value="CARDIOLOGIST">Cardiologist</option>
                    <option value="PSYCHOLOGIST">Psychologist</option>
                    <option value="DERMATOLOGIST">Dermatologist</option>
                    <option value="NEPHROLOGIST">Nephtologist</option>
                    </select>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Add Doctor</button>
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

