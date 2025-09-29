import { useState } from "react";

function Dashboard({ patients }) {
  const [selectedPatient, setSelectedPatient] = useState(
    patients.length > 0 ? patients[0] : null
  );
  const [documents, setDocuments] = useState({}); // { patientId: [files] }

  const handleFileUpload = (e) => {
    if (!selectedPatient) return;

    const filesArray = Array.from(e.target.files).map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      date: new Date().toLocaleString(),
    }));

    setDocuments((prev) => ({
      ...prev,
      [selectedPatient.id]: [...(prev[selectedPatient.id] || []), ...filesArray],
    }));

    e.target.value = ""; // limpa o input
  };

  return (
    <div className="page">
      <h1>Dashboard - Upload de Documentos</h1>

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
            <div className="upload-section">
              <h2>Upload de Documentos</h2>
              <input type="file" multiple onChange={handleFileUpload} />

              {documents[selectedPatient.id] &&
                documents[selectedPatient.id].length > 0 && (
                  <div className="doc-list">
                    <h3>Documentos enviados:</h3>
                    <ul>
                      {documents[selectedPatient.id].map((doc, i) => (
                        <li key={i}>
                          {doc.name} ({doc.type}, {doc.size} bytes) - {doc.date}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
