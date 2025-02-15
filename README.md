## Project: Clinic Appointment Management System

This project is a web application to manage clinic appointments for both patients and doctors. It provides role-based access, where patients can book appointments and view their own appointments, and doctors can manage appointments and view statistics.

### Table of Contents
1. [File Structure](#file-structure)
2. [Team Distribution](#team-distribution)
3. [Screens and Features](#screens-and-features)
4. [How to Run the Project](#how-to-run-the-project)
5. [Contributing](#contributing)

---

### File Structure

```
gsg-clinic-appointment-system/
│
├── public/                   # Public files like index.html, assets, etc.
├── src/                      # Source code for the app
│   ├── assets/               # Static files (e.g., images, icons)
│   ├── components/           # Reusable UI components (Button.js, Input.js, etc.)
│   ├── hooks/                # Custom hooks for logic and state management
│   ├── screens/              # Individual pages/screens like Login, Dashboard, etc.
│   ├── types/                # TypeScript types
│   ├── providers/            # Contexts and providers for state management
│   ├── states/               # State management (global state)
│   ├── utils/                # Utility functions
│   ├── App.css               # Global styles
│   ├── App.tsx               # Main component of the app
│   ├── main.tsx              # Entry point for React app
│   ├── index.css             # Base styling
│   ├── vite-env.d.ts         # TypeScript Vite environment definitions
│   └── tsconfig.app.json     # TypeScript config for app
├── package.json              # Project dependencies and scripts
├── package-lock.json         # Lock file for npm dependencies
├── vite.config.ts            # Vite config for bundling and development
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # Global TypeScript config
├── tsconfig.node.json        # TypeScript configuration for Node.js
├── eslint.config.js          # ESLint configuration for linting
├── README.md                 # Project README (this file)
└── .gitignore                # Git ignore file
```

---

### Team Distribution
- **Abd Alsalam** (Team Lead): GitHub management, design, code integration, and doctor appointment management (ManageAppointments.tsx, AppointmentCard.tsx)
- **Mohammad Salameen**: Authentication system (AuthContext.tsx, Login.tsx)
- **Mohammad Dwaikat**: Patient-side (CreateAppointment.tsx, ViewAppointments.tsx)
- **Ahmad**: Dashboard (Dashboard.tsx, charts & statistics)
- **Omar**: UI components (Button.tsx, Input.tsx, Select.tsx, Modal.tsx)

---

### Screens and Features

#### Screen 1: Login (Role-based)
- **Roles**: Patient / Doctor
- **Patients**:
  - Can only book/view their own appointments.
- **Doctors**:
  - Access to a dashboard with management features.
- **Validation**: Basic form validation for login fields.

#### Screen 2: Create Appointment (Patient)
- **Form Fields**:
  - Patient name, contact, age, gender
  - Date/time picker (limited to clinic working hours: 9 AM – 5 PM)
  - Symptoms description (text area)
- **Actions**:
  - Display confirmation message after submission.

#### Screen 3: View/Manage Appointments (Doctor)
- **List**: All appointments sorted by date.
- **Filter**: By appointment status: Pending / Confirmed / Completed.
- **Doctor Actions**:
  - Change appointment status
  - Add notes (e.g., "Bring lab reports")
  - Search by patient name

#### Screen 4: Dashboard (Doctor)
- **Statistics Cards**:
  - Total appointments today
  - Pending vs. confirmed appointments
- **Visual Chart**: Bar/Pie chart showing appointments per day.

---

### How to Run the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-repository/gsg-clinic-appointment-system.git
   ```

2. **Navigate to the Project Folder**
   ```bash
   cd gsg-clinic-appointment-system
   ```

3. **Install Dependencies**
   Install project dependencies using `npm` or `yarn`:
   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the Development Server**
   To start the project locally:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the Application**
   Open your browser and go to `http://localhost:3000` to view the app.

---

### Contributing

- **Branching**: Each team member should create a new branch for their tasks (e.g., `feature/login`, `feature/dashboard`).
- **Commits**: Write clear, descriptive commit messages for each change.
- **Pull Requests**: Open pull requests for team review before merging into the `main` branch.

For any issues or contributions, please raise an issue or create a pull request on the GitHub repository.

--- 
