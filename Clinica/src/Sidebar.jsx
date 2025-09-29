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
              {/* <i className="icon-dashboard"></i> */} Dashboard
            </button>
          </li>
          <li>
            <button
              className={activePage === "cadastro" ? "active" : ""}
              onClick={() => setActivePage("cadastro")}
            >
              {/* <i className="icon-user-plus"></i> */} Cadastro de Paciente
            </button>
          </li>
          <li>
            <button
              className={activePage === "pacientes" ? "active" : ""}
              onClick={() => setActivePage("pacientes")}
            >
              {/* <i className="icon-list"></i> */} Lista de Pacientes
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
