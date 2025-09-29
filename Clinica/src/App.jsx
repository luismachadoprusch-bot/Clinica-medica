import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  // Função para adicionar paciente
  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now() }]);
    setActivePage("pacientes"); // Depois de cadastrar, mostra lista
  };

  return (
    <div className="dashboard">
      {/* Passando activePage para a Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === "dashboard" && <Dashboard patients={patients} />}
        {activePage === "cadastro" && <PatientForm addPatient={addPatient} />}
        {activePage === "pacientes" && <PatientList patients={patients} />}
      </main>
    </div>
  );
}

export default App;
