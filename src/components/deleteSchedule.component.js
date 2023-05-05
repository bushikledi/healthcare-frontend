import React, { useState} from "react";
import { Link } from "react-router-dom";
import api from "../services/api"

function DeleteSchedule(props) {
  const [schedule] = useState(props.location.state.schedule);
  const [showAdminBoard] = useState(props.location.state.showAdminBoard);
  const handleConfirm = () => {
    api.delete(`/schedule/delete/${schedule.scheduleId}`)
    .then(() => {
      const nextState = { showAdminBoard: true }; // Set the next state
      props.history.push({ pathname: "/admin/schedules", state: nextState }); // Pass the state
      window.location.reload();
    });
  };
    
  return (
    showAdminBoard? (
    <div className="schedule-list-container">
    <h2>Delete Schedule</h2>
    <ul className="schedule-list">
          <li className="schedule-list-one">
            Doctor: {schedule.doctor.name} ({schedule.doctor.speciality})
            <br></br>
            Availability: {schedule.scheduleAvailability} 
            <br></br>
            Schedule Date: {new Date(schedule.scheduleDate).toLocaleString()}
            <br></br>
            <button className="btn-cancel" onClick={() => handleConfirm()}>Delete</button>
            <Link to={{pathname:"/admin/schedules", state: { showAdminBoard }}}>
              <button className="btn-confirm">Cancel</button>
            </Link>
          </li>
    </ul>
  </div>
  ):(
    <h2>Unauthorised</h2>
   )
  );
}

export default DeleteSchedule;
