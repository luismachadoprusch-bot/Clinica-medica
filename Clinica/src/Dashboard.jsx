function Dashboard({ patients }) {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Total de pacientes cadastrados: {patients.length}</p>
    </div>
  );
}

export default Dashboard;
