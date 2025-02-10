import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Form from "./components/Form/form.component";
import Appointments from "./components/appointments/appointments.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/doctor" element={<Appointments />} />
      </Routes>
    </Router>
  );
}

export default App;
