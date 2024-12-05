import React, { useState } from "react";
import styles from "../../styles/AdminForm.module.css";
import CreateSerieForm from './SeriesForms/CreateSerieForm'
import UpdateSerieForm from "./SeriesForms/UpdateSerieForm";
import DeleteSerieForm from "./SeriesForms/DeleteSerieForm";

const SeriesForms = () => {
  const [action, setAction] = useState("create"); // Estado para controlar a ação (Adicionar, Atualizar, Deletar)
   
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Séries aaa</h2>

      {/* Seletor de ação */}
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="action"
            value="create"
            checked={action === "create"}
            onChange={handleActionChange}
          />
          Adicionar
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="update"
            checked={action === "update"}
            onChange={handleActionChange}
          />
          Atualizar
        </label>
        <label>
          <input
            type="radio"
            name="action"
            value="delete"
            checked={action === "delete"}
            onChange={handleActionChange}
          />
          Deletar
        </label>
      </div>

      {/* Formulários baseados na ação */}
      <div>
        {action === "create" && (
          <CreateSerieForm/>
        )}
        {action === "update" && (
          <UpdateSerieForm/>
        )}
        {action === "delete" && (
          <DeleteSerieForm/>
        )}
      </div>
    </div>
  );
};

export default SeriesForms;
