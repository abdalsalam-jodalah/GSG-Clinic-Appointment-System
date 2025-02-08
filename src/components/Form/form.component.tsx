import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment } from "../../@types";
import Input from "../input/input.component";
import ConfirmDialog from "../confirm/confirm.component";
import { AppContext } from "../../context/AppContext";

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
  const [formData, setFormData] = useState<Appointment>(INITIAL_APPOINTMENT);

  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { dispatch, state } = useContext(AppContext);

  const handleChange = (field: string, value: string | number) => {
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

    dispatch({ type: "CREATE_APPOINTMENT", payload: newAppointment });

    setConfirmationMessage("Your appointment has been booked successfully!");
    setTimeout(() => setConfirmationMessage(null), 3000);
    setFormData(INITIAL_APPOINTMENT);
  };

  return (
    <div className="bg-white text-gray-800 p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-bold mb-4">Create Appointment</h2>

        {confirmationMessage && (
          <div className="bg-green-100 text-green-800 p-2 rounded">
            {confirmationMessage}
          </div>
        )}

        <Input
          label="Patient Name"
          name="patientName"
          id="patientName"
          type="text"
          value={formData.patientName}
          onChange={(e) => handleChange("patientName", e.target.value)}
        />
        <Input
          label="Contact"
          name="contact"
          id="contact"
          type="text"
          value={formData.contact}
          onChange={(e) => handleChange("contact", e.target.value)}
        />
        <Input
          label="Age"
          name="age"
          id="age"
          type="number"
          value={formData.age}
          onChange={(e) => handleChange("age", Number(e.target.value))}
        />
        <Input
          label="Gender"
          name="gender"
          id="gender"
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
          id="symptoms"
          type="textarea"
          value={formData.symptoms}
          onChange={(e) => handleChange("symptoms", e.target.value)}
        />
        <Input
          label="Notes"
          name="notes"
          id="notes"
          type="textarea"
          value={formData.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
        />

        {/* Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date & Time
          </label>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleChange("date", date?.toISOString() ?? "")}
            showTimeSelect
            dateFormat="Pp"
            timeIntervals={15}
            minTime={new Date(new Date().setHours(9, 0, 0))}
            maxTime={new Date(new Date().setHours(17, 0, 0))}
            className="mt-1 p-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      <ConfirmDialog
        isOpen={isDialogOpen}
        onConfirm={confirmSubmit}
        onCancel={() => setIsDialogOpen(false)}
      />

      {/* Display the list of appointments */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">List of Appointments</h3>
        {state.appointments.length > 0 ? (
          state.appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-gray-100 p-4 rounded mb-2 shadow"
            >
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
          <p className="text-gray-600">No appointments yet!</p>
        )}
      </div>
    </div>
  );
};

export default Form;
