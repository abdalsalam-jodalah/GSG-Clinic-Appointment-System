import { useState, useEffect, useCallback, ChangeEvent } from "react";

interface Appointment {
    id: string;
    patientName: string;
    contact: string;
    age: number;
    gender: string;
    symptoms: string;
    notes?: string;
    date: string;
    status: "Pending" | "Confirmed" | "Completed";
}

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const [status, setStatus] = useState<"Pending" | "Confirmed" | "Completed" | "All" | any>("Pending");

    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments-manage") || "[]");
        setAppointments(storedAppointments);
    }, []);

    const saveAppointments = useCallback((updatedAppointments: Appointment[]) => {
        setAppointments(updatedAppointments);
        localStorage.setItem("appointments-manage", JSON.stringify(updatedAppointments));
    }, []);

    const updateStatus = useCallback((id: string, value: "Pending" | "Confirmed" | "Completed") => {
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, status: value } : appointment
        );
        saveAppointments(updatedAppointments);
    }, [appointments, saveAppointments]);

    const addNotes = useCallback((id: string, notes: string) => {
        const updatedAppointments = appointments.map((appointment) =>
            appointment.id === id ? { ...appointment, notes } : appointment
        );
        saveAppointments(updatedAppointments);
    }, [appointments, saveAppointments]);

    const filteredAppointments = appointments
        .filter((appointment) => {
            const isNameMatch = appointment.patientName.toLowerCase().includes(searchValue.toLowerCase());
            const isStatusMatch = status === "All" || appointment.status === status;
            return isNameMatch && isStatusMatch;
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    return {
        searchValue,
        status,
        setStatus,
        handleSearchChange,
        filteredAppointments,
        updateStatus,
        addNotes,
        setAppointments,
    };
}

