import { useState, useEffect } from "react";
import data from "./data.json";
import './Prontuario.css';
function Prontuario() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(data);
  }, []);

  return (
    <div className="page">
      <h1>Prontuário Eletrônico</h1>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Contato</th>
              <th>Histórico</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.age}</td>
                <td>{p.phone}</td>
                <td>{p.history}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Prontuario;
