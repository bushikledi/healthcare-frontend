import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"

function ScheduleList(props) {
  const [showUserBoard] = useState(props.location.state?.showUserBoard);
  const [schedules, setSchedules] = useState([]);
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);

  useEffect(() => {
    api.get("/schedule/all")
      .then((response) => {
        setSchedules(response.data);
        setFilteredSchedules(response.data);
      });
  }, [showUserBoard]);

  const handleFilter = (speciality) => {
    setSelectedSpeciality(speciality);
    const filtered = schedules.filter((schedule) => {
      return schedule.doctor.speciality === speciality;
    });
    setFilteredSchedules(filtered);
  };

  const clearFilter = () => {
    setSelectedSpeciality(null);
    setFilteredSchedules(schedules);
  };

  return (
     showUserBoard? (
    <div className="schedule-list-container">
        <h2>Filter by Speciality</h2>
      <div className="filter-buttons-container">
        <button className="clear-filter-button" onClick={() => clearFilter()}>Show All</button>
        <button onClick={() => handleFilter("CARDIOLOGIST")}>Cardiologist</button>
        <button onClick={() => handleFilter("PSYCHOLOGIST")}>Psychologist</button>
        <button onClick={() => handleFilter("DERMATOLOGIST")}>Dermatologist</button>
        <button onClick={() => handleFilter("NEPHROLOGIST")}>Nephrologist</button>
      </div>
      <h2>All Schedules</h2>
      <ul className="schedule-list">
        {filteredSchedules.map((schedule) => (
            <li className="schedule-list-one">
                Doctor: {schedule.doctor.name} ({schedule.doctor.speciality})
                <br></br>
                Availability: {schedule.scheduleAvailability} 
                <br></br>
                Schedule Date: {new Date(schedule.scheduleDate).toLocaleString()} 
                <br></br>
                <Link to={{ pathname: "/new-appointment", state: { schedule, showUserBoard } }} key={schedule.scheduleId}>
                    <button className="set-app-button">Set Appointment</button>
                   </Link> 
                </li>
        ))}
      </ul>
    </div>
   ):(
    <h2>Unauthorised</h2>
   )
  );
}

export default ScheduleList;
