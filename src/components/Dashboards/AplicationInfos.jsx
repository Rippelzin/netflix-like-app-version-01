import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/AplicationInfos.module.css'; // Importando o CSS Module

const AplicationInfos = () => {
  const [averageDuration, setAverageDuration] = useState({
    average_movie_duration: null,
    average_episode_duration: null
  });
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchContentMediumDuration = async () => {
      try {
        // Fazendo a requisição para pegar a duração média dos filmes e episódios
        const response = await axios.get('http://localhost:3000/api/content/ContentMediumDuration', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        // Atualizando o estado com os dados da resposta
        setAverageDuration(response.data);
      } catch (err) {
        // Tratando erros de requisição
        setError('Erro ao carregar dados de duração');
        console.error('Erro ao buscar dados:', err);
      }
    };

    // Chama a função de buscar os dados quando o componente é montado
    fetchContentMediumDuration();
  }, [token]);

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Informações da Aplicação</h2>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div>
          <p className={styles.infoText}>
            <span className={styles.durationLabel}>Duração média dos filmes:</span> 
            {averageDuration.average_movie_duration ? `${averageDuration.average_movie_duration} minutos` : <span className={styles.loading}>Carregando...</span>}
          </p>
          <p className={styles.infoText}>
            <span className={styles.durationLabel}>Duração média dos episódios:</span> 
            {averageDuration.average_episode_duration ? `${averageDuration.average_episode_duration} minutos` : <span className={styles.loading}>Carregando...</span>}
          </p>
        </div>
      )}
    </div>
  );
};

export default AplicationInfos;
