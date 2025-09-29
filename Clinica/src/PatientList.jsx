function PatientList({ patients, onEdit, onDelete, onOpen, onNew }) {
  return (
    <div className="page">
      <div className="list-header">
        <h1>Pacientes</h1>
        <div>
          <button onClick={onNew}>Novo Paciente</button>
        </div>
      </div>

      {patients.length === 0 ? (
        <p>Nenhum paciente cadastrado.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Idade</th>
              <th>Contato</th>
              <th>Última visita</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => {
              const lastVisit =
                p.visits && p.visits.length
                  ? p.visits[p.visits.length - 1].date
                  : "-";
              return (
                <tr key={p.id}>
                  <td>
                    <button className="linkish" onClick={() => onOpen(p.id)}>
                      {p.name}
                    </button>
                  </td>
                  <td>{p.age || "-"}</td>
                  <td>{p.phone || p.email || "-"}</td>
                  <td>{lastVisit}</td>
                  <td className="actions">
                    <button onClick={() => onEdit(p.id)}>Editar</button>
                    <button className="danger" onClick={() => onDelete(p.id)}>
                      Remover
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientList;
