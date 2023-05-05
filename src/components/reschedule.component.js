import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"

function Reschedule(props) {
  const [appointment] = useState(props.location.state.appointment);
  const [schedules, setSchedules] = useState([]);
  const [speciality, setSpeciality] = useState(null);
  
  useEffect(() => {
    api.get(`/doctor/${appointment.doctorId}`)
      .then((response) => {
        setSpeciality(response.data.doctorSpeciality);
      });
  }, [appointment.doctorId]);

  useEffect(() => {
    if (speciality) {
      api.get("/schedule/all")
        .then((response) => {
          const filtered = response.data.filter((schedule) => {
            console.log(schedule.doctor.speciality );
            return schedule.doctor.speciality === speciality;
          });
          setSchedules(filtered);
        });
    }
  }, [speciality]);
  const handleConfirm = (scheduleId) => {
    api.put(`/appointment/reschedule/${appointment.appointmentId}?scheduleId=${scheduleId}`)
    .then(
      () => {
        props.history.push("/appointments");
        window.location.reload();
      }
    );
  };  
  return (
    <div className="schedule-list-container">
      <h2>All Schedules</h2> 
      <ul className="schedule-list">
        {schedules.map((schedule) => (
          <li className="schedule-list-one">
            Doctor: {schedule.doctor.name} ({schedule.doctor.speciality})
            <br></br>
            Availability: {schedule.scheduleAvailability} 
            <br></br>
            Schedule Date: {new Date(schedule.scheduleDate).toLocaleString()} 
            <br></br>
            <button className="btn-confirm" onClick={() => handleConfirm(schedule.scheduleId)}>Change</button>

          </li>
        ))}
      </ul>
      <Link to="/appointments">
              <button className="btn-cancel">Cancel</button>
            </Link>
    </div>
  );
}

export default Reschedule;
