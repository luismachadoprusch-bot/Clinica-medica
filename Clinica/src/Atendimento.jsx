import { useState } from "react";
import "./Atendimento.css";

function Atendimento({ patients }) {
  const [waiting, setWaiting] = useState([]);
  const [inConsultation, setInConsultation] = useState([]);

  // Redirecionar para videoconferência
  const startTeleconsultation = (patient) => {
    // Gerar link único para cada paciente
    const roomName = `consulta-${patient.id}-${Date.now()}`;
    const meetUrl = `https://meet.jit.si/${roomName}`;
    window.open(meetUrl, "_blank"); // abre nova aba com a teleconsulta
    startConsultation(patient.id);
  };

  const addToWaiting = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    if (patient && !waiting.find((p) => p.id === patientId)) {
      setWaiting([...waiting, patient]);
    }
  };

  const startConsultation = (patientId) => {
    const patient = waiting.find((p) => p.id === patientId);
    if (patient) {
      setWaiting(waiting.filter((p) => p.id !== patientId));
      setInConsultation([...inConsultation, patient]);
    }
  };

  const finishConsultation = (patientId) => {
    setInConsultation(inConsultation.filter((p) => p.id !== patientId));
  };

  return (
    <div className="page">
      <h1>Controle de Sala de Atendimento</h1>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        <>
          <div className="select-patient">
            <label>Adicionar à fila de espera:</label>
            <select
              onChange={(e) => addToWaiting(parseInt(e.target.value))}
              defaultValue=""
            >
              <option value="" disabled>
                Selecione paciente
              </option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="queues">
            <div className="queue">
              <h2>Aguardando</h2>
              {waiting.length === 0 ? (
                <p>Ninguém na fila</p>
              ) : (
                <ul>
                  {waiting.map((p) => (
                    <li key={p.id}>
                      {p.name}{" "}
                      <button onClick={() => startTeleconsultation(p)}>
                        Iniciar Teleconsulta
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="queue">
              <h2>Em Consulta</h2>
              {inConsultation.length === 0 ? (
                <p>Ninguém em consulta</p>
              ) : (
                <ul>
                  {inConsultation.map((p) => (
                    <li key={p.id}>
                      {p.name}{" "}
                      <button onClick={() => finishConsultation(p.id)}>
                        Finalizar
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Atendimento;
