import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import axios from 'axios';

// Registrando os componentes necessários do Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DoughnutDashboard = () => {
  const [dataChart, setDataChart] = useState({ labels: [], datasets: [] });
  const token = localStorage.getItem('token');

  // Função para gerar cores aleatórias
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fazendo a requisição GET com o cabeçalho Authorization
        const response = await axios.get('http://localhost:3000/api/content/genrescounttotal', {
          headers: {
            "Authorization": `Bearer ${token}`, // Envia o token no cabeçalho
          },
        });

        const genresList = response.data.genres;

        // Criando arrays para os rótulos e as contagens
        const genreLabels = genresList.map(genre => genre.genre);
        const genreCounts = genresList.map(genre => genre.genre_count);

        // Gerando um array de cores aleatórias para cada gênero
        const genreColors = genreLabels.map(() => getRandomColor());

        // Definindo os dados do gráfico
        setDataChart({
          labels: genreLabels,
          datasets: [
            {
              label: 'Qtd. com esta tag: ',
              data: genreCounts,
              backgroundColor: genreColors, // Usando as cores aleatórias
              borderColor: genreColors.map(color => color), // Mantendo as bordas na mesma cor
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, [token]); // Roda novamente se o token mudar

  // Configuração do gráfico
  const config = {
    type: 'doughnut',
    data: dataChart,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: false,
          text: 'Quantidade Total de Conteúdo por Gêneros',
        },
      },
    },
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center', // Centraliza horizontalmente
        alignItems: 'center',     // Centraliza verticalmente
      }}
    >
      <div style={{ width: '40vh', height: '40vh', marginBottom: "20vh" }}>  {/* Ajustando o tamanho do gráfico */}
        <h2>Quantidade Total de Conteúdo por Gêneros</h2>
        <Doughnut data={dataChart} options={config.options} />
      </div>
    </div>
  );
};

export default DoughnutDashboard;
