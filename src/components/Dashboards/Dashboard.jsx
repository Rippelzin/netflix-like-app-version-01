// src/components/BarChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import styles from "../../styles/AdminPage.module.css"
import axios from 'axios';

// Registrando os componentes necessários do Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Dashboard = () => {
  const [dataChart, setDataChart] = useState(null);
  const token = localStorage.getItem('token')

  // Função para buscar os dados da API
  useEffect(() => {
    const fetchData = async () => {
      // Aqui, você fará a requisição para a sua API
      // Vou usar um exemplo com fetch() (substitua pela sua URL real de API)
      try {
         // Fazendo a requisição GET com o cabeçalho Authorization
         const response = await axios.get('http://localhost:3000/api/content/genrescount', {
          headers: {
              "Authorization": `Bearer ${token}`, // Envia o token no cabeçalho
          },
      });
         const genres = response.data
        
         //genres.map(genre => console.log(genre.movies_count))
        //const genres = Object.keys(result.genres);

        //setando contagem de filmes e series por genero
        
        const movieCounts = genres.map(genre => genre.movies_count);
        const seriesCounts = genres.map(genre => genre.series_count);
        
        
        const genreLabel = genres.map(genre => genre.genre)
        
        setDataChart({
          labels: genreLabel,
          datasets: [
            {
              label: 'Movies',
              data: movieCounts,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Series',
              data: seriesCounts,
              backgroundColor: 'rgba(153, 102, 255, 0.5)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  // Se os dados ainda não foram carregados
  if (!dataChart) {
    return <div>Loading...</div>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Cor do tooltip
        titleColor: 'red', // Cor do título do tooltip
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black', // Cor das marcações no eixo X
        },
      },
      y: {
        ticks: {
          color: 'black', // Cor das marcações no eixo Y
        },
      },
    },
  };

  return (
    <div className={styles.dashboardContainer}>
      <h2>Genres of Movies and Series</h2>
      <Bar data={dataChart} options={options} />
    </div>
  );
};

export default Dashboard;
