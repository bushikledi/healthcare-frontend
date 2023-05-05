import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import UserService from "../services/user.service"
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
        showUserBoard: false,
        showAdminBoard: false,
        lastname: "",
        firstname: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          showUserBoard: response.data.role === "USER",
          showAdminBoard: response.data.role === "ADMIN",
          firstname: response.data.firstname,
          lastname: response.data.lastname
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    const {showUserBoard, showAdminBoard, firstname, lastname } = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h1>Welcome {firstname} {lastname}</h1>
        </header>
        <div className="navbar-nav mr-auto">
            {showUserBoard &&(
              <>
              <li className="nav-item">
              <Link to={{ pathname: "/schedule", state: { showUserBoard } }} className="nav-link">
              <h3 className="home-options">New Appointment</h3>
            </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/appointments"} className="nav-link">
                    <h3 className="home-options">Reserved Appointments</h3>
                    </Link>
                  </li>
              </>
            )}
            {showAdminBoard &&(
            <>
              <li className="nav-item">
              <Link to={"/add-schedule"} className="nav-link">
              <h3 className="home-options">Add schedule</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add-doctor"} className="nav-link">
              <h3 className="home-options">Add doctor</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link to={{ pathname: "/admin/schedules", state: { showAdminBoard } }} className="nav-link">
              <h3 className="home-options">Schedules</h3>
            </Link>
                  </li>
            </>
            )} 
          </div>
      </div>
    );
  }
}