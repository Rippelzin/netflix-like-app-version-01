import React, { useState } from "react";
import styles from "../../styles/AdminForm.module.css";
import CreateEpisodeForm from "./EpisodesForms/CreateEpisodeForm";  // Formulário para criar episódio
import UpdateEpisodeForm from "./EpisodesForms/UpdateEpisodeForm";  // Formulário para atualizar episódio
import DeleteEpisodeForm from "./EpisodesForms/DeleteEpisodeForm";  // Formulário para deletar episódio

const EpisodeFormsController = () => {
  const [action, setAction] = useState("create"); // Estado para controlar a ação (Adicionar, Atualizar, Deletar)

  const handleActionChange = (event) => {
    setAction(event.target.value);  // Altera a ação com base na escolha do usuário
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Episódios</h2>

      {/* Seletor de ação (Adicionar, Atualizar ou Deletar) */}
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

      {/* Exibe o formulário de acordo com a ação selecionada */}
      <div>
        {action === "create" && (
          <CreateEpisodeForm />
        )}
        {action === "update" && (
          <UpdateEpisodeForm />
        )}
        {action === "delete" && (
          <DeleteEpisodeForm />
        )}
      </div>
    </div>
  );
};

export default EpisodeFormsController;
