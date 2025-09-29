import { useState } from "react";

function Agenda({ patients, onAddAppointment }) {
  const [selectedPatient, setSelectedPatient] = useState(
    patients.length > 0 ? patients[0] : null
  );
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentNotes, setAppointmentNotes] = useState("");

  const handleAdd = () => {
    if (!selectedPatient || !appointmentDate) return;

    const newAppointment = {
      id: Date.now(),
      date: appointmentDate,
      notes: appointmentNotes,
    };

    onAddAppointment(selectedPatient.id, newAppointment);
    setAppointmentDate("");
    setAppointmentNotes("");
  };

  return (
    <div className="page">
      <h1>Agenda de Consultas</h1>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
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

          <div className="form" style={{ marginTop: "20px" }}>
            <label>Data da Consulta:</label>
            <input
              type="datetime-local"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
            />
            <label>Observações:</label>
            <textarea
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
            ></textarea>
            <button onClick={handleAdd}>Adicionar Consulta</button>
          </div>

          {selectedPatient.visits && selectedPatient.visits.length > 0 && (
            <div style={{ marginTop: "20px" }}>
              <h3>Consultas Agendadas:</h3>
              <ul>
                {selectedPatient.visits.map((v) => (
                  <li key={v.id}>
                    {v.date} - {v.notes || "-"}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Agenda;
