"use client";

import type React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth } from "../context/AuthContext";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { state } = useContext(AppContext); // Access the AppContext

  const today = new Date().toISOString().split("T")[0];
  const appointmentsToday = state.appointments.filter(
    (appointment) => appointment.date.toISOString().split("T")[0] === today
  );
  const pendingAppointments = state.appointments.filter(
    (appointment) => appointment.status === "Pending"
  );
  const confirmedAppointments = state.appointments.filter(
    (appointment) => appointment.status === "Confirmed"
  );

  const appointmentsPerDay = state.appointments.reduce((acc, appointment) => {
    const date = appointment.date.toISOString().split("T")[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = {
    labels: Object.keys(appointmentsPerDay),
    datasets: [
      {
        label: "Appointments",
        data: Object.values(appointmentsPerDay),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Appointments per Day",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full px-4 sm:px-0">
        <div className="bg-white shadow-lg sm:rounded-3xl sm:p-20 p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-center text-blue-500">
                Total Appointments Today
              </h2>
              <p className="text-3xl font-bold text-center text-blue-500">
                {appointmentsToday.length}
              </p>
            </div>
            <div className="bg-yellow-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-center text-blue-500">
                Pending Appointments
              </h2>
              <p className="text-3xl font-bold text-center text-blue-500">
                {pendingAppointments.length}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-center text-blue-500">
                Confirmed Appointments
              </h2>
              <p className="text-3xl font-bold text-center text-blue-500">
                {confirmedAppointments.length}
              </p>
            </div>
          </div>
          <div className="h-64 mb-6">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
