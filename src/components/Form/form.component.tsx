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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @ts-ignore
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
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

    const newAppointment = {
      ...formData,
      id: `${Date.now()}-${Math.random()}`,
    };

    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);

    const savedAppointments = JSON.parse(localStorage.getItem("appointments-manage") || "[]");
    savedAppointments.push(newAppointment);
    localStorage.setItem("appointments-manage", JSON.stringify(savedAppointments));

    setConfirmationMessage("Your appointment has been booked successfully!");
    setTimeout(() => setConfirmationMessage(null), 3000);
    setFormData(INITIAL_APPOINTMENT);
  };

  return (
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Appointment</h2>

        {confirmationMessage && (
            <div className="bg-green-100 text-green-700 p-3 rounded-md text-center mb-3">
              {confirmationMessage}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Patient Name" name="patientName" type="text" value={formData.patientName}
                 onChange={(e) => handleChange("patientName", e.target.value)}
          />
          <Input label="Contact" name="contact" type="text" value={formData.contact}
                 onChange={(e) => handleChange("contact", e.target.value)}
          />
          <Input label="Age" name="age" type="number" value={formData.age}
                 onChange={(e) => handleChange("age", Number(e.target.value))}
          />
          <Input label="Gender" name="gender" type="select" value={formData.gender}
                 onChange={(e) => handleChange("gender", e.target.value as "Male" | "Female")}
                 options={["Male", "Female"]}
          />
          <Input label="Symptoms" name="symptoms" type="textarea" value={formData.symptoms}
                 onChange={(e) => handleChange("symptoms", e.target.value)}
          />
          <Input label="Notes" name="notes" type="textarea" value={formData.notes}
                 onChange={(e) => handleChange("notes", e.target.value)}
          />

          {/* Date Picker */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Date & Time</label>
            <DatePicker
                selected={formData.date}
                onChange={(date) => handleChange("date", date)}
                showTimeSelect
                dateFormat="Pp"
                timeIntervals={15}
                minTime={new Date(new Date().setHours(9, 0, 0))}
                maxTime={new Date(new Date().setHours(17, 0, 0))}
                className="w-full p-2 border rounded-md"
            />
          </div>

          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg">
            Submit
          </button>
        </form>

        <ConfirmDialog isOpen={isDialogOpen} onConfirm={confirmSubmit} onCancel={() => setIsDialogOpen(false)} />

        <button
            type="button"
            onClick={() => navigate("/doctor")}
            className="mt-4 w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-lg"
        >
          Go to the doctor page
        </button>
      </div>
  );
};

export default Form;
