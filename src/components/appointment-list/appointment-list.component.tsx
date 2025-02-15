import React from "react";
import { Appointment } from "../../types/@appointment";

interface AppointmentListProps {
    appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
            <h3 className="text-xl font-bold text-gray-800 mb-4">List of Appointments</h3>
            {appointments.length > 0 ? (
                appointments.map((appointment) => (
                    <div key={appointment.id} className="bg-gray-100 p-4 rounded-lg mb-4">
                        <p><strong>Patient Name:</strong> {appointment.patientName}</p>
                        <p><strong>Contact:</strong> {appointment.contact}</p>
                        <p><strong>Age:</strong> {appointment.age}</p>
                        <p><strong>Gender:</strong> {appointment.gender}</p>
                        <p><strong>Symptoms:</strong> {appointment.symptoms}</p>
                        <p><strong>Notes:</strong> {appointment.notes}</p>
                        <p><strong>Date & Time:</strong> {new Date(appointment.date).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No appointments yet!</p>
            )}
        </div>
    );
};

export default AppointmentList;
