import React, { useState } from "react";
import styles from "../../styles/AdminForm.module.css";

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
          <form className={styles.form}>
            <h3>Adicionar Filme</h3>
            <label>
              Titulo:
              <input className={styles.input} type="text" placeholder="Digite o titulo" />
            </label>
            <label>
              Descrição:
              <textarea className={styles.input} placeholder="Digite a descrição"></textarea>
            </label>
            <button className={styles.button} type="submit">Adicionar</button>
          </form>
        )}
        {action === "update" && (
          <form className={styles.form}>
            <h3>Atualizar Filme</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID do filme" />
            </label>
            <label>
              Novo Titulo:
              <input className={styles.input} type="text" placeholder="Digite o novo titulo" />
            </label>
            <button className={styles.button} type="submit">Atualizar</button>
          </form>
        )}
        {action === "delete" && (
          <form className={styles.form}>
            <h3>Deletar Filme</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID do filme" />
            </label>
            <button className={styles.button} type="submit">Deletar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default MovieForms;
