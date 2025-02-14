import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../types/@appointment";
import Input from "../input/input.component";
import ConfirmDialog from "../confirm/confirm.component";
import { useNavigate } from "react-router-dom";

const INITIAL_APPOINTMENT: Appointment = {
  id: `${Date.now()}-${Math.random()}`,
  patientName: "",
  contact: "",
  age: 0,
  gender: "Male",
  date: new Date(),
  symptoms: "",
  status: "Pending",
  notes: "",
};

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Appointment>(INITIAL_APPOINTMENT);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const confirmSubmit = () => {
    setIsDialogOpen(false);
    console.log("Appointment Submitted:", formData);

    const newAppointment = {
      ...formData,
      id: `${Date.now()}-${Math.random()}`,
    };

    setAppointments((prevAppointments) => [
      ...prevAppointments,
      newAppointment,
    ]);

    const savedAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]"
    );
    savedAppointments.push(newAppointment);
    localStorage.setItem("appointments", JSON.stringify(savedAppointments));
    
    setConfirmationMessage("Your appointment has been booked successfully!");
    setTimeout(() => setConfirmationMessage(null), 3000);
    setFormData(INITIAL_APPOINTMENT);

    
  };
  const doctorPage = () =>{
navigate("/doctor");
  }



  

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create Appointment</h2>

        {confirmationMessage && <div>{confirmationMessage}</div>}

        <Input
          label="Patient Name"
          name="patientName"
          type="text"
          value={formData.patientName}
          onChange={(e) => handleChange("patientName", e.target.value)}
        />
        <Input
          label="Contact"
          name="contact"
          type="text"
          value={formData.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
        />
        <Input
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={(e) => handleChange("age", Number(e.target.value))}
        />
        <Input
          label="Gender"
          name="gender"
          type="select"
          value={formData.gender}
          onChange={(e) =>
            handleChange("gender", e.target.value as "Male" | "Female")
          }
          options={["Male", "Female"]}
        />
        <Input
          label="Symptoms"
          name="symptoms"
          type="textarea"
          value={formData.symptoms}
          onChange={(e) => handleChange("symptoms", e.target.value)}
        />
        <Input
          label="Notes"
          name="notes"
          type="textarea"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />

        {/* Date Picker */}
        <div>
          <label>Date & Time</label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleChange("date", date)}
            showTimeSelect
            dateFormat="Pp"
            timeIntervals={15}
            minTime={new Date(new Date().setHours(9, 0, 0))}
            maxTime={new Date(new Date().setHours(17, 0, 0))}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={confirmSubmit}
        onCancel={() => setIsDialogOpen(false)}
      />
      <button type="button" onClick={doctorPage}>
        Go to the doctor page{" "}
      </button>

      ;{/* Display the list of appointments */}
      <div>
        <h3>List of Appointments</h3>
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div key={appointment.id}>
              <p>
                <strong>Patient Name:</strong> {appointment.patientName}
              </p>
              <p>
                <strong>Contact:</strong> {appointment.contact}
              </p>
              <p>
                <strong>Age:</strong> {appointment.age}
              </p>
              <p>
                <strong>Gender:</strong> {appointment.gender}
              </p>
              <p>
                <strong>Symptoms:</strong> {appointment.symptoms}
              </p>
              <p>
                <strong>Notes:</strong> {appointment.notes}
              </p>
              <p>
                <strong>Date & Time:</strong>{" "}
                {appointment.date.toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p>No appointments yet!</p>
        )}
      </div>
    </div>
  );
};

export default Form;
