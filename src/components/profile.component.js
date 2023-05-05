import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { email: "", firstname: "", lastname: "", gender: "", dateOfBirth: "" }
    };
  }

  
  

  componentDidMount() {
    AuthService.getCurrentUser().then(response=>{
      const user = response.data
      console.log(user);
        if (!user) this.setState({ redirect: "/home" });
        this.setState({ currentUser: user, userReady: true })
    });
}

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    const { currentUser } = this.state;
  
    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.firstname} {currentUser.lastname}</strong>
          </h3>
        </header>
        <p>
          <strong>Firstname:</strong>{" "}
          {currentUser.firstname}
        </p>
        <p>
          <strong>Lastname:</strong>{" "}
          {currentUser.lastname}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <p>
          <strong>Gender:</strong>{" "}
          {currentUser.gender}
        </p>
        <p>
          <strong>Role:</strong>{" "}
          {currentUser.role}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {currentUser.dateOfBirth}
        </p>
      </div>: null}
      </div>
    );
  }
}
