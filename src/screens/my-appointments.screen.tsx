import  {useEffect, useState} from 'react'
import AppointmentList from "../components/appointment-list/appointment-list.component.tsx";
import {Appointment} from "../types/@appointment.ts";

const MyAppointmentsScreen = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments-manage") || "[]");
        setAppointments(storedAppointments);
    }, []);

    return (
        <>
            <h1 className="text-2xl font-bold text-center mt-6">Appointment Dashboard</h1>
            <AppointmentList appointments={appointments}/>
        </>
    )
}

export default MyAppointmentsScreen