import React from "react";

function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>Menu</h2>
        <small>Sistema EHR</small>
      </div>
      <nav>
        <ul>
          <li>
            <button
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() => setActivePage("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              className={activePage === "cadastro" ? "active" : ""}
              onClick={() => setActivePage("cadastro")}
            >
              Cadastro de Paciente
            </button>
          </li>
          <li>
            <button
              className={activePage === "pacientes" ? "active" : ""}
              onClick={() => setActivePage("pacientes")}
            >
              Lista de Pacientes
            </button>
          </li>
          <li>
            <button
              className={activePage === "prontuario" ? "active" : ""}
              onClick={() => setActivePage("prontuario")}
            >
              Prontuário
            </button>
          </li>
          <li>
            <button
              className={activePage === "historico" ? "active" : ""}
              onClick={() => setActivePage("historico")}
            >
              Histórico
            </button>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        © 2025 Sistema EHR
      </div>
    </aside>
  );
}

export default Sidebar;
