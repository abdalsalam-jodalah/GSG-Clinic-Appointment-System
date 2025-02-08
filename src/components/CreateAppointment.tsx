"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Form from "./Form/form.component";
const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    contact: "",
    age: "",
    gender: "",
    date: "",
    time: "",
    symptoms: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log("Appointment data:", formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Appointment Confirmed
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your appointment has been successfully booked.
          </p>
          <button
            onClick={() => navigate("/create-appointment")}
            className="mt-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Book Another Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Book an Appointment
        </h2>
        <Form />
      </div>
    </div>
  );
};

export default CreateAppointment;

{
  /* <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
<div className="rounded-md shadow-sm -space-y-px">
  <div>
    <label htmlFor="name" className="sr-only">
      Name
    </label>
    <input
      id="name"
      name="name"
      type="text"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Name"
      value={formData.name}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="contact" className="sr-only">
      Contact
    </label>
    <input
      id="contact"
      name="contact"
      type="text"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Contact"
      value={formData.contact}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="age" className="sr-only">
      Age
    </label>
    <input
      id="age"
      name="age"
      type="number"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Age"
      value={formData.age}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="gender" className="sr-only">
      Gender
    </label>
    <select
      id="gender"
      name="gender"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      value={formData.gender}
      onChange={handleChange}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div>
    <label htmlFor="date" className="sr-only">
      Date
    </label>
    <input
      id="date"
      name="date"
      type="date"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      value={formData.date}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="time" className="sr-only">
      Time
    </label>
    <input
      id="time"
      name="time"
      type="time"
      required
      min="09:00"
      max="17:00"
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      value={formData.time}
      onChange={handleChange}
    />
  </div>
  <div>
    <label htmlFor="symptoms" className="sr-only">
      Symptoms
    </label>
    <textarea
      id="symptoms"
      name="symptoms"
      required
      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      placeholder="Describe your symptoms"
      value={formData.symptoms}
      onChange={handleChange}
    />
  </div>
</div>

<div>
  <button
    type="submit"
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  >
    Book Appointment
  </button>
</div>
</form> */
}
