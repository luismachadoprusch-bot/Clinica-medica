import { useState } from "react";

function PatientForm({ addPatient }) {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
    email: "",
    history: "",
    alerts: [], // campo de alertas adicionado
    visits: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAlertsChange = (e) => {
    // transforma texto separado por vírgula em array
    const alertsArray = e.target.value.split(",").map((a) => a.trim());
    setFormData({ ...formData, alerts: alertsArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return alert("O nome é obrigatório!");

    // Adiciona paciente
    addPatient({ ...formData, id: Date.now(), visits: [] });

    // Limpa o formulário
    setFormData({
      name: "",
      age: "",
      phone: "",
      email: "",
      history: "",
      alerts: [],
      visits: [],
    });
  };

  return (
    <div className="page">
      <h1>Cadastro de Paciente</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Idade"
            value={formData.age}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <input
            type="text"
            name="phone"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <textarea
            name="history"
            placeholder="Histórico Médico"
            value={formData.history}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <textarea
            name="alerts"
            placeholder="Alergias / Contraindicações (separar por vírgula)"
            value={formData.alerts.join(", ")}
            onChange={handleAlertsChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Cadastrar</button>
          <button
            type="button"
            className="muted"
            onClick={() =>
              setFormData({
                name: "",
                age: "",
                phone: "",
                email: "",
                history: "",
                alerts: [],
                visits: [],
              })
            }
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
}

export default PatientForm;
