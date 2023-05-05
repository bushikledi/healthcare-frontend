import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api"

function NewAppoint(props) {
  const [selectedSchedule] = useState(props.location.state.schedule);
  const [showUserBoard] = useState(props.location.state.showUserBoard);
  const [billingAmount, setBillingAmount] = useState(0);
  const [billingId, setBillingId] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const history = useHistory();

  useEffect(() => {
    api.get(`/billing/doctor/${selectedSchedule.doctor.doctorId}`)
      .then((response) => {
        setBillingAmount(response.data.amount);
        setBillingId(response.data.billingId);
      });
  }, [selectedSchedule.doctor.doctorId, setBillingAmount, setBillingId]);

  const handleConfirm = (event) => {
    event.preventDefault();
    api.post("appointment/create",{
        billingId: billingId,
        doctorId: selectedSchedule.doctor.doctorId,
        appointmentDate: selectedSchedule.scheduleDate 
    });
    setIsConfirmed(true);
  };

  const handleCancel = (event) => {
    event.preventDefault();
    history.goBack();
  };

  if (isConfirmed) {
    history.push("/");
    return null;
  }

  return (
    showUserBoard?(
    <div className="new-appoint-container">
      <h2 className="new-appoint-header">New Appointment</h2>
      <div className="new-appoint-details">
        <p>Please confirm the following appointment:</p>
        <p>
          <strong>Doctor:</strong> {selectedSchedule.doctor.name} ({selectedSchedule.doctor.speciality})
        </p>
        <p>
          <strong>Date:</strong> {new Date(selectedSchedule.scheduleDate).toLocaleString()}
        </p>
        <p>
          <strong>Availability:</strong> {selectedSchedule.scheduleAvailability}
        </p>
        <p>
          <strong>Billing amount:</strong> {billingAmount}
        </p>
      </div>
          <button className="btn-confirm" onClick={handleConfirm}>Confirm</button>
          <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
    </div>
  ):(
    <h2>Unauthorised</h2>
   )
  );
}

export default NewAppoint;
