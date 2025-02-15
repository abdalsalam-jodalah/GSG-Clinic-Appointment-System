export const validateUsername = (username: string): string | null => {
    if (!username) return "Username is required";
    if (username.length < 3) return "Username must be at least 3 characters long";
    return null;
};

export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return null;
};

export const validateAppointmentDate = (appointmentDate: string): string | null => {
    const currentDate = new Date();
    const date = new Date(appointmentDate);
    if (!appointmentDate) return "Appointment date is required";
    if (date < currentDate) return "Appointment date cannot be in the past";
    return null;
};
