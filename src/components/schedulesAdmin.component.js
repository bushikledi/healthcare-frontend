import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api"

function ScheduleListAdmin(props) {
    const [showAdminBoard] = useState(props.location.state?.showAdminBoard ?? false);
//   const [showAdminBoard] = useState(props.location.state?.showAdminBoard);
  console.log(showAdminBoard);
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
  }, [showAdminBoard]);

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
    showAdminBoard? (
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
                   <Link to={{ pathname: "/update-schedule", state: { schedule, showAdminBoard } }}>
                    <button className="btn-confirm">Update</button>
                   </Link> 
                <Link to={{ pathname: "/delete-schedule", state: { schedule, showAdminBoard } }} >
                    <button className="btn-cancel">Delete</button>
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

export default ScheduleListAdmin;
