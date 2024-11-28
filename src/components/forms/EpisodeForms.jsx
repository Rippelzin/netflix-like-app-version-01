import React, { useState } from "react";
import styles from "../../styles/AdminForm.module.css";

const EpisodeForms = () => {
  const [action, setAction] = useState("create");

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Episódios</h2>

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

      <div>
        {action === "create" && (
          <form className={styles.form}>
            <h3>Adicionar Episódio</h3>
            <label>
              Titulo:
              <input className={styles.input} type="text" placeholder="Digite o titulo do episódio" />
            </label>
            <label>
              Duração:
              <input className={styles.input} type="number" placeholder="Digite a duração" />
            </label>
            <button className={styles.button} type="submit">Adicionar</button>
          </form>
        )}
        {action === "update" && (
          <form className={styles.form}>
            <h3>Atualizar Episódio</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID do episódio" />
            </label>
            <label>
              Nova Duração:
              <input className={styles.input} type="number" placeholder="Digite a nova duração" />
            </label>
            <button className={styles.button} type="submit">Atualizar</button>
          </form>
        )}
        {action === "delete" && (
          <form className={styles.form}>
            <h3>Deletar Episódio</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID do episódio" />
            </label>
            <button className={styles.button} type="submit">Deletar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EpisodeForms;
