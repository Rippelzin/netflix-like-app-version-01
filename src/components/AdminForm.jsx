import React, { useState } from "react";
import styles from "../styles/AdminForm.module.css";

const AdminForm = () => {
  const [action, setAction] = useState("create"); // Estado para controlar o formulário atual

  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Form</h1>

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

      {/* Formulário dinâmico com base na ação */}
      {action === "create" && (
        <form className={styles.form}>
          <label>
            Titulo:
            <input className={styles.input} type="text" name="title" placeholder="Digite o titulo" />
          </label>
          <label>
            Descricao:
            <textarea
              className={styles.input}
              name="description"
              placeholder="Digite a descricao"
            ></textarea>
          </label>
          <button className={styles.button} type="submit">
            Adicionar
          </button>
        </form>
      )}

      {action === "update" && (
        <form className={styles.form}>
          <label>
            ID:
            <input className={styles.input} type="text" name="id" placeholder="" />
          </label>
          <label>
            Novo Titutlo:
            <input className={styles.input} type="text" name="title" placeholder="Digite novo titulo" />
          </label>
          <label>
            Nova Descricao:
            <textarea
              className={styles.input}
              name="description"
              placeholder="Digite nova descricao"
            ></textarea>
          </label>
          <button className={styles.button} type="submit">
            Atualizar
          </button>
        </form>
      )}

      {action === "delete" && (
        <form className={styles.form}>
          <label>
            Id:
            <input className={styles.input} type="text" name="id" placeholder="Enter content ID" />
          </label>
          <button className={styles.button} type="submit">
            Deletar
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminForm;
