import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import Prontuario from "./Prontuario";
import Historico from "./Historico";
import Agenda from "./Agenda"; // importando agenda
import Atendimento from "./Atendimento";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now(), visits: [] }]);
    setActivePage("pacientes");
  };

  const addAppointment = (patientId, appointment) => {
    setPatients(
      patients.map((p) =>
        p.id === patientId
          ? { ...p, visits: [...(p.visits || []), appointment] }
          : p
      )
    );
  };

  return (
    <div className="dashboard">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === "dashboard" && <Dashboard patients={patients} />}
        {activePage === "cadastro" && <PatientForm addPatient={addPatient} />}
        {activePage === "pacientes" && <PatientList patients={patients} />}
        {activePage === "prontuario" && <Prontuario patients={patients} />}
        {activePage === "historico" && <Historico patients={patients} />}
        {activePage === "atendimento" && <Atendimento patients={patients} />}
        {activePage === "agenda" && (
          <Agenda patients={patients} onAddAppointment={addAppointment} />
        )}
      </main>
    </div>
  );
}

export default App;
