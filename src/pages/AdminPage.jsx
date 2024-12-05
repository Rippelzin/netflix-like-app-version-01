// src/pages/admin.js ou src/pages/admin/index.js
import React, { useState } from "react";
import Sidebar from "../components/Sidebar"; // Importando o Sidebar
import AdminForm from "../components/AdminForm";
import styles from "../styles/AdminPage.module.css"; // Estilos da página de Admin
import Dashboard from "../components/Dashboards/Dashboard";
import DoughnutDashboarad from "../components/Dashboards/DoughnutDashboarad";
import AplicationInfos from "../components/Dashboards/AplicationInfos";

const AdminPage = () => {

const [selectedItem, setSelectedItem] = useState(1)

const handleClick = (option) => {
    setSelectedItem(option)
    console.log(selectedItem)
}

  return (

    <div className={styles.pageContainer}>

      <Sidebar handleClick={handleClick}/>

      <div className={styles.mainContent}>
        
        { selectedItem === 1 && (
          <AdminForm />
        )}

        { selectedItem === 2 && (
          <div className={styles.dashboardContainer} >
            <AplicationInfos />
            <Dashboard />
            <DoughnutDashboarad />
          </div>
          
        )}
        
      </div>
    </div>
  );
};

export default AdminPage;
