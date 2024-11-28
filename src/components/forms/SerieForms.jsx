import React, { useState } from "react";
import styles from "../../styles/AdminForm.module.css";

const SerieForms = () => {
  const [action, setAction] = useState("create");

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h2>Gerenciar Séries</h2>

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
            <h3>Adicionar Série</h3>
            <label>
              Titulo:
              <input className={styles.input} type="text" placeholder="Digite o titulo" />
            </label>
            <label>
              Numero de Episodios:
              <input className={styles.input} type="number" placeholder="Digite o numero de episódios" />
            </label>
            <button className={styles.button} type="submit">Adicionar</button>
          </form>
        )}
        {action === "update" && (
          <form className={styles.form}>
            <h3>Atualizar Série</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID da série" />
            </label>
            <label>
              Novo Numero de Episodios:
              <input className={styles.input} type="number" placeholder="Digite o novo número de episódios" />
            </label>
            <button className={styles.button} type="submit">Atualizar</button>
          </form>
        )}
        {action === "delete" && (
          <form className={styles.form}>
            <h3>Deletar Série</h3>
            <label>
              ID:
              <input className={styles.input} type="text" placeholder="Digite o ID da série" />
            </label>
            <button className={styles.button} type="submit">Deletar</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SerieForms;
