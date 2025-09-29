import { useState } from "react";
import Sidebar from "./Sidebar";
import Dashboard from "./Dashboard";
import PatientForm from "./PatientForm";
import PatientList from "./PatientList";
import Prontuario from "./Prontuario";
import Historico from "./Historico";
import "./App.css";

function App() {
  const [patients, setPatients] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  // Adicionar paciente
  const addPatient = (patient) => {
    setPatients([...patients, { ...patient, id: Date.now(), visits: [] }]);
    setActivePage("pacientes");
  };

  // Editar paciente
  const editPatient = (id, updatedData) => {
    setPatients(
      patients.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  // Remover paciente
  const removePatient = (id) => {
    setPatients(patients.filter((p) => p.id !== id));
  };

  return (
    <div className="dashboard">
      {/* Sidebar com destaque da página ativa */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        {activePage === "dashboard" && <Dashboard patients={patients} />}
        {activePage === "cadastro" && <PatientForm addPatient={addPatient} />}
        {activePage === "pacientes" && (
          <PatientList
            patients={patients}
            onEdit={editPatient}
            onDelete={removePatient}
            onNew={() => setActivePage("cadastro")}
          />
        )}
        {activePage === "prontuario" && <Prontuario patients={patients} />}
        {activePage === "historico" && <Historico patients={patients} />}
      </main>
    </div>
  );
}

export default App;
