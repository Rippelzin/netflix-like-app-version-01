import React from 'react';
import styles from '../styles/Banner.module.css';
import useFetch from '../hooks/useFetch';

const Banner = ({ item, onClose, handlePlayClick }) => {
  const { data: episodes, loading, error } = useFetch(`http://localhost:3000/api/series/${item.movie_id}/episodes`);

  return (
    <div className={styles.banner_container}>
      <img src={item.cover_image_url} alt={item.title} className={styles.banner_image} />

      <div className={styles.banner_content}>
        <div className={styles.banner_title}>{item.title}</div>
        <div className={styles.banner_info}>
          <span>{item.duration} min</span>
          <span className={styles.ageRating}>{item.age_rating}+</span>
        </div>
        <div className={styles.banner_description}>{item.description}</div>
        <div className={styles.banner_buttons}>
            {item.content_type === "movie" && 
                <button className={`${styles.banner_button} ${styles.play}`} onClick={() => handlePlayClick(item)}>Play</button>
            }
          
          <button className={`${styles.banner_button} ${styles.moreInfo}`}>More Info</button>
        </div>

        {/* Seção de Episódios */}
        {item.content_type === "series" && (
          <div className={styles.episodes_section}>
            {loading && <p>Carregando episódios...</p>}
            {error && <p>Erro: {error}</p>}
            {episodes && episodes.map((episode, index) => (
              <div key={index} className={styles.episode}>
                <div className={styles.episode_title}>{episode.title}</div>
                <div className={styles.episode_duration}>{episode.duration} min</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={onClose} className={styles.close_button}>✕</button>
    </div>
  );
};

export default Banner;
