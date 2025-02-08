"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "../context/AuthContext"

// Mock data for appointments
const mockAppointments = [
  {
    id: 1,
    patientName: "John Doe",
    date: "2023-06-01",
    time: "10:00",
    status: "Pending",
    symptoms: "Headache",
    notes: "",
  },
  {
    id: 2,
    patientName: "Jane Smith",
    date: "2023-06-01",
    time: "11:00",
    status: "Confirmed",
    symptoms: "Fever",
    notes: "Bring previous lab reports",
  },
  {
    id: 3,
    patientName: "Bob Johnson",
    date: "2023-06-02",
    time: "09:30",
    status: "Completed",
    symptoms: "Cough",
    notes: "Follow-up in 2 weeks",
  },
]

const ManageAppointments: React.FC = () => {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState(mockAppointments)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  const filteredAppointments = appointments
    .filter((appointment) => filter === "all" || appointment.status.toLowerCase() === filter)
    .filter((appointment) => appointment.patientName.toLowerCase().includes(search.toLowerCase()))

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  const handleAddNotes = (id: number, notes: string) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, notes } : appointment)),
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold mb-6">Manage Appointments</h1>
          <div className="mb-4 flex justify-between">
            <select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
            </select>
            <input
              type="text"
              placeholder="Search by patient name"
              className="p-2 border rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <ul className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <li key={appointment.id} className="border p-4 rounded">
                <h3 className="font-semibold">{appointment.patientName}</h3>
                <p>
                  Date: {appointment.date} Time: {appointment.time}
                </p>
                <p>Status: {appointment.status}</p>
                <p>Symptoms: {appointment.symptoms}</p>
                <div className="mt-2">
                  <select
                    className="p-2 border rounded mr-2"
                    value={appointment.status}
                    onChange={(e) => handleStatusChange(appointment.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Add notes"
                    className="p-2 border rounded"
                    value={appointment.notes}
                    onChange={(e) => handleAddNotes(appointment.id, e.target.value)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ManageAppointments

