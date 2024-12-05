import React, { useState } from "react";
import styles from "../styles/AdminForm.module.css";
import MovieFormsController from "./forms/MovieFormsController";
import SerieFormsController from "./forms/SerieFormsController";
import EpisodeFormsController from "./forms/EpisodeFormsController";

const AdminForm = () => {
  const [content, setContent] = useState("movie"); // Estado para controlar o tipo principal

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin Form</h1>

      {/* Seletor principal (Movie, Serie, Episode) */}
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            name="content"
            value="movie"
            checked={content === "movie"}
            onChange={handleContentChange}
          />
          Movie
        </label>
        <label>
          <input
            type="radio"
            name="content"
            value="serie"
            checked={content === "serie"}
            onChange={handleContentChange}
          />
          Serie
        </label>
        <label>
          <input
            type="radio"
            name="content"
            value="episode"
            checked={content === "episode"}
            onChange={handleContentChange}
          />
          Episode
        </label>
      </div>

      {/* Renderização condicional dos formulários */}
      <div className={styles.formContainer}>
        {content === "movie" && <MovieFormsController />}
        {content === "serie" && <SerieFormsController />}
        {content === "episode" && <EpisodeFormsController />}
      </div>
    </div>
  );
};

export default AdminForm;
