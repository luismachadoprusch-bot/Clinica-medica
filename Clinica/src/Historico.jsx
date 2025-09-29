import { useState, useEffect } from "react";
import data from "./data.json"; // JSON com pacientes e histórico
import "./Historico.css"; // CSS separado para estilizar

function Historico() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(data);
  }, []);

  return (
    <div className="page">
      <h1>Histórico de Consultas, Exames e Tratamentos</h1>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        patients.map((p) => (
          <div key={p.id} className="card">
            <h2>{p.name}</h2>
            <p><strong>Idade:</strong> {p.age}</p>
            <p><strong>Telefone:</strong> {p.phone}</p>
            <p><strong>Histórico Médico:</strong> {p.history}</p>

            <h3>Consultas / Exames / Tratamentos</h3>
            {p.visits && p.visits.length > 0 ? (
              p.visits.map((v, i) => (
                <div key={i} className="visit-card">
                  <span><strong>Data:</strong> {v.date}</span>
                  <p>{v.notes}</p>
                </div>
              ))
            ) : (
              <p>Nenhuma visita registrada.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Historico;
