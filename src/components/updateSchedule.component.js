import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function UpdateSchedule(props) {
  const [schedule] = useState(props.location.state.schedule);
  const [showAdminBoard] = useState(props.location.state.showAdminBoard);
  const [scheduleDate, setScheduleDate] = useState(new Date(schedule.scheduleDate).toISOString().substr(0, 16));
  const [doctorId, setDoctorId] = useState(schedule.doctor.doctorId);
  const [doctors, setDoctors] = useState([]);
  const [scheduleAvailability, setScheduleAvailability] = useState(schedule.scheduleAvailability);

  const handleConfirm = () => {
    api.put(`/schedule/update/${schedule.scheduleId}`, {
      scheduleDate: new Date(scheduleDate),
      doctorId,
      scheduleAvailability,
    })
      .then(() => {
        const nextState = { showAdminBoard: true };
        props.history.push({ pathname: "/admin/schedules", state: nextState });
        window.location.reload();
      });
  };

  useEffect(() => {
    api.get('/doctor/all')
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    showAdminBoard ? (
      <div className="schedule-list-container">
        <h2>Update Schedule</h2>
        <ul className="schedule-list">
          <li className="schedule-list-one">
          <div className="form-group">
            <label htmlFor="doctor">Doctor:</label>
            <select 
            className="form-control"
            name="doctor"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            >
                <option value="">Select Doctor</option>
                {doctors.map((doctor) => (
                    <option key={doctor.doctorId} value={doctor.doctorId}>
                        {doctor.doctorName} ({doctor.doctorSpeciality})
                        </option>
                        ))}
                        </select>
                        </div>
                {/* <div className="form-group">
                <label htmlFor="availability">Availability:</label>
                <select 
                className="form-control"
                name="availability"
                value={scheduleAvailability}
                onChange={(e) => setScheduleAvailability(e.target.value)}
                >
                    <option value="">Select Availability</option>
                    <option value="AVAILABLE">Available</option>
                    <option value="UNAVAILABLE">Unavailable</option>
                    </select>
                    </div> */}
            Schedule Date:
            <input
              type="datetime-local"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
            />
            <br />
            <br></br>
            <button className="btn-confirm" onClick={() => handleConfirm()}>Update</button>
            <Link to={{ pathname: "/admin/schedules", state: { showAdminBoard } }}>
              <button className="btn-cancel">Cancel</button>
            </Link>
          </li>
        </ul>
      </div>
    ) : (
      <h2>Unauthorised</h2>
    )
  );
}

export default UpdateSchedule;
