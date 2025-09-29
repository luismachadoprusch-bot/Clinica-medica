import { useState } from "react";

function Dashboard({ patients }) {
  const [selectedPatient, setSelectedPatient] = useState(
    patients.length > 0 ? patients[0] : null
  );

  return (
    <div className="page">
      <h1>Dashboard</h1>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado. Vá para "Cadastro de Paciente".</p>
      ) : (
        <>
          <label>
            <strong>Selecionar paciente:</strong>
            <select
              value={selectedPatient ? selectedPatient.id : ""}
              onChange={(e) =>
                setSelectedPatient(
                  patients.find((p) => p.id === parseInt(e.target.value))
                )
              }
            >
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>

          {selectedPatient && (
            <>
              <div className="alerts-section">
                <h2>Alertas de Alergias e Contraindicações</h2>
                {selectedPatient.alerts && selectedPatient.alerts.length > 0 ? (
                  <ul>
                    {selectedPatient.alerts.map((alert, i) => (
                      <li key={i} className="alert">
                        ⚠️ {alert}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Sem alertas registrados.</p>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
