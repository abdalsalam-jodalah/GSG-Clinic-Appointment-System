import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./apointments.css";

export default function Appointments() {
  const [searchValue, setSearchValue] = useState("");
  const [status, setStatus] = useState("Pending");
  const [appointments, setAppointments] = useState<any[]>([]);
  const navigate = useNavigate();

  function filtering(event: ChangeEvent<HTMLInputElement>): void {
    setSearchValue(event.target.value);
  }

  function updateStatus(id: string, value: string) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: value } : appointment
      )
    );
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, status: value } : appointment
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  }

  function addNotes(id: string, notes: string) {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id ? { ...appointment, notes: notes } : appointment
      )
    );
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, notes: notes } : appointment
    );
    localStorage.setItem("appointments", JSON.stringify(updatedAppointments));
  }

  const filteredAppointments = appointments
    .filter((appointment) => {
      const isNameMatch =
        appointment.patientName &&
        appointment.patientName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      const isStatusMatch = appointment.status === status || status === "All";
      return isNameMatch && isStatusMatch;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  function deleteAllPatient() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const storedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    setAppointments(storedAppointments);
  }, []);

  return (
    <div className="doctor-page">
      <div className="search-container">
        <input
          type="search"
          onChange={filtering}
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
                    value={appointment.notes}
                    onChange={(e) => addNotes(appointment.id, e.target.value)}
                    placeholder="Add notes..."
                  />
                </td>
                <td>{new Date(appointment.date).toLocaleString()}</td>
                <td>
                  <button
                    onClick={() => updateStatus(appointment.id, "Confirmed")}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(appointment.id, "Completed")}
                  >
                    Complete
                  </button>
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
        Delete all patient
      </button>
    </div>
  );
}
