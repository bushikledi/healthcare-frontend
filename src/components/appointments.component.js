import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"
// import NewAppoint from "./newappoint.component";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/appointment/all")
      .then((response) => {
        setAppointments(response.data);
      });
  }, []);

  return (
    <div className="schedule-list-container">
      <h2>All Appointments</h2>
      <ul className="schedule-list">
        {appointments.map((appointment) => (
           
            <li className="schedule-list-one">
                Date: {appointment.appointmentDate}
                <br></br>
                Status: {appointment.appointmentStatus} 
                <br></br>
                <Link to={{ pathname: "/reschedule", state: { appointment } }} key={appointment.appointmentId}>
                    <button className="set-app-button">Reschedule</button>
                   </Link> 
                   <Link to={{ pathname: "/delete-appointment", state: { appointment } }} key={appointment.appointmentId}>
                    <button className="set-app-button">Delete</button>
                   </Link> 
                </li>
          
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
