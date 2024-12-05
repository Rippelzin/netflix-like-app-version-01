// src/components/Sidebar.js
import React from "react";
import { Link } from "react-router-dom"; // Importando Link para navegação

import styles from "../styles/Sidebar.module.css"; // Estilos da Sidebar

const Sidebar = ({handleClick}) => {


  return (
    <div className={styles.sidebar}>
      <h2>Admin Menu</h2>
      {/* Botões de navegação */}
      <div className={styles.buttonContainer}>
        <div >
          <button className={styles.sidebarButton} onClick={() => handleClick(1)}>ADMIN FORMS</button>
        </div>
        <div >
          <button className={styles.sidebarButton} onClick={() => handleClick(2)}>Dashboard</button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
