import { useState } from "react";

/* Visit form inside patient record */
function VisitForm({ onAdd, onCancel }) {
  const [v, setV] = useState({
    date: new Date().toISOString().slice(0, 10),
    reason: "",
    diagnosis: "",
    prescription: "",
    notes: "",
  });

  const handle = (e) => setV({ ...v, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!v.reason) {
      alert("Informe o motivo/queixa");
      return;
    }
    onAdd({ ...v, id: `${Date.now()}-${Math.random().toString(36).slice(2,6)}` });
  };

  return (
    <form className="form" onSubmit={submit}>
      <div className="row">
        <input name="date" type="date" value={v.date} onChange={handle} />
        <input name="reason" placeholder="Queixa principal" value={v.reason} onChange={handle} />
      </div>
      <input name="diagnosis" placeholder="Diagnóstico" value={v.diagnosis} onChange={handle} />
      <input name="prescription" placeholder="Prescrição / Medicações" value={v.prescription} onChange={handle} />
      <textarea name="notes" placeholder="Notas da consulta" value={v.notes} onChange={handle} />
      <div className="form-actions">
        <button type="submit">Adicionar Visita</button>
        <button type="button" className="muted" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

function PatientRecord({ patient, onBack, onUpdate, onDelete }) {
  const [adding, setAdding] = useState(false);

  if (!patient) return <div className="page"><p>Paciente não encontrado.</p></div>;

  const addVisit = (visit) => {
    const updated = { ...patient, visits: [...(patient.visits || []), visit] };
    onUpdate(patient.id, updated);
    setAdding(false);
  };

  const deleteVisit = (vid) => {
    if (!confirm("Remover visita?")) return;
    const updated = { ...patient, visits: (patient.visits || []).filter((v) => v.id !== vid) };
    onUpdate(patient.id, updated);
  };

  return (
    <div className="page">
      <div className="record-header">
        <div>
          <h1>{patient.name}</h1>
          <p className="muted">{patient.age ? `${patient.age} anos` : ""} {patient.gender ? `• ${patient.gender}` : ""}</p>
          <p>{patient.phone} {patient.email ? `• ${patient.email}` : ""}</p>
        </div>
        <div className="record-actions">
          <button onClick={onBack}>Voltar</button>
          <button className="danger" onClick={() => onDelete(patient.id)}>Remover Paciente</button>
        </div>
      </div>

      <section className="card small">
        <h3>Observações</h3>
        <p>{patient.notes || "—"}</p>
      </section>

      <section className="visits">
        <div className="list-header">
          <h2>Histórico de Visitas</h2>
          <div>
            <button onClick={() => setAdding((s) => !s)}>{adding ? "Fechar" : "Adicionar Visita"}</button>
          </div>
        </div>

        {adding && <VisitForm onAdd={addVisit} onCancel={() => setAdding(false)} />}

        <div>
          {(patient.visits || []).length === 0 && <p>Nenhuma visita registrada.</p>}
          {(patient.visits || []).slice().reverse().map((v) => (
            <article key={v.id} className="card">
              <div className="visit-head">
                <strong>{v.date}</strong>
                <div>
                  <button className="danger small" onClick={() => deleteVisit(v.id)}>Remover</button>
                </div>
              </div>
              <p><strong>Queixa:</strong> {v.reason}</p>
              <p><strong>Diagnóstico:</strong> {v.diagnosis || "—"}</p>
              <p><strong>Prescrição:</strong> {v.prescription || "—"}</p>
              <p><strong>Notas:</strong> {v.notes || "—"}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PatientRecord;
