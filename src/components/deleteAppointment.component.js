import React, { useState} from "react";
import { Link } from "react-router-dom";
import api from "../services/api"

function DeleteAppointment(props) {
  const [appointment] = useState(props.location.state.appointment);
  const handleConfirm = () => {
    api.delete(`/appointment/delete/${appointment.appointmentId}`)
    .then(
      () => {
        props.history.push("/appointments");
        window.location.reload();
      }
    );
  };  
  return (
    <div className="schedule-list-container">
    <h2>Delete Appointment</h2>
    <ul className="schedule-list">
          <li className="schedule-list-one">
              Date: {appointment.appointmentDate}
              <br></br>
              Status: {appointment.appointmentStatus} 
              <br></br>
            <button className="btn-cancel" onClick={() => handleConfirm()}>Delete</button>
          </li>
    </ul>
    <Link to="/appointments">
              <button className="btn-confirm">Cancel</button>
            </Link>
  </div>
  );
}

export default DeleteAppointment;
