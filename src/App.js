import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import ScheduleList from "./components/schedule.component";
import NewAppoint from "./components/newappoint.component";
import Appointments from "./components/appointments.component";
import Reschedule from "./components/reschedule.component";
import AddSchedule from "./components/addSchedule.component";
import DeleteAppointment from "./components/deleteAppointment.component";
import AddDoctor from "./components/addDoctor.component";
import ScheduleListAdmin from "./components/schedulesAdmin.component";
import DeleteSchedule from "./components/deleteSchedule.component";
import UpdateSchedule from "./components/updateSchedule.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

async componentDidMount() {
    document.title = 'Healthcare';
    try {
      const response = await AuthService.getCurrentUser();
      const user = response.data;
  
      if (user) {
        this.setState({
          currentUser: user,
          showUserBoard: user.role === 'USER',
          showAdminBoard: user.role === 'ADMIN',
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showUserBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Healthcare
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
          </div>
          
          {currentUser? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/appointments" component={Appointments} />
            <Route path="/schedule" component={ScheduleList} />
            <Route path="/new-appointment" component={NewAppoint} />
            <Route path="/reschedule" component={Reschedule} />
            <Route path="/add-schedule" component={AddSchedule} />
            <Route path="/add-doctor" component={AddDoctor} />
            <Route path="/delete-appointment" component={DeleteAppointment} />
            <Route path="/admin/schedules" component={ScheduleListAdmin} />
            <Route path="/update-schedule" component={UpdateSchedule} />
            <Route path="/delete-schedule" component={DeleteSchedule} />
            
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
