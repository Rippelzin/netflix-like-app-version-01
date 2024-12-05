import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import styles from "../../styles/AdminForm.module.css";
import CreateMovieForm from "./MoviesForms.jsx/CreateMovieForm";
import UpdateMovieForm from "./MoviesForms.jsx/UpdateMovieForm";
import DeleteMovieForm from "./MoviesForms.jsx/DeleteMovieForm";

const MovieForms = () => {
  const [action, setAction] = useState("create"); // Estado para controlar a ação (Adicionar, Atualizar, Deletar)
   
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Filmes</h2>

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
           <CreateMovieForm/>
        )}
        {action === "update" && (
          <UpdateMovieForm/>
        )}
        {action === "delete" && (
          <DeleteMovieForm/>
        )}
      </div>
    </div>
  );
};

export default MovieForms;
