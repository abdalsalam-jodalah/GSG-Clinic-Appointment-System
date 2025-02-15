import React from "react";
import { useAppointments } from "../../hooks/useAppointments";
import { useNavigate } from "react-router-dom";
import "./apointments.css";

const Appointments = () => {
  const navigate = useNavigate();
  const {
    searchValue,
    status,
    setStatus,
    handleSearchChange,
    filteredAppointments,
    updateStatus,
    addNotes,
  } = useAppointments();

  const deleteAllPatient = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
      <div className="doctor-page">
        <div className="search-container">
          <input
              type="search"
              onChange={handleSearchChange}
              value={searchValue}
              className="search"
              placeholder="Search by patient name"
          />

          <select
              className="border p-1 rounded"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pending">🟠 Pending</option>
            <option value="Confirmed">🟢 Confirmed</option>
            <option value="Completed">✅ Completed</option>
            <option value="All">📋 All</option>
          </select>
        </div>

        <table className="table-appointments">
          <thead>
          <tr>
            <th>Patient Id</th>
            <th>Patient Name</th>
            <th>Contact</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Symptoms</th>
            <th>Notes</th>
            <th>Date & Time</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.id}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.contact}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.symptoms}</td>
                    <td>
                  <textarea
                      value={appointment.notes || ""}
                      onChange={(e) => addNotes(appointment.id, e.target.value)}
                      placeholder="Add notes..."
                  />
                    </td>
                    <td>{new Date(appointment.date).toLocaleString()}</td>
                    <td>
                      <button onClick={() => updateStatus(appointment.id, "Confirmed")}>Confirm</button>
                      <button onClick={() => updateStatus(appointment.id, "Completed")}>Complete</button>
                    </td>
                  </tr>
              ))
          ) : (
              <tr>
                <td colSpan={9}>No appointments found</td>
              </tr>
          )}
          </tbody>
        </table>
        <button type="button" onClick={deleteAllPatient}>
          Delete all patients
        </button>
      </div>
  );
};

export default React.memo(Appointments);
