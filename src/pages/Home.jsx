import React, { useState } from 'react';
import SliderComponent from "../components/SliderComponent";
import Banner from '../components/Banner';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Sliders from '../components/Sliders';

const Home = () => {
  const { data: content, loading, error } = useFetch('http://localhost:3000/api/content');
  console.log(content)
  
  const [selectedItem, setSelectedItem] = useState(null);


  const navigate = useNavigate();

  function handleCardClick(item) {
    setSelectedItem(item);
  }

  function onClose() {
    setSelectedItem(null);
  }

  function handlePlayClick(playedItem) {
    navigate("/player", { state: { playedItem } });
  }

  return (
    <div>
      {/* Exibe o componente SliderComponent apenas quando os dados "filmes" estiverem carregados */}
      {!loading && content && (
       /* <SliderComponent filmesSeries={filmes} onCardClick={handleCardClick} />*/
       <Sliders content={content} onCardClick={handleCardClick} />

      )}

      {/* Exibe o componente Banner quando um item for selecionado */}
      {selectedItem && (
        <Banner item={selectedItem} onClose={onClose} handlePlayClick={handlePlayClick} />
      )}

      {/* Exibe uma mensagem de erro se houver um erro na requisição */}
      {error && <p>Erro ao carregar filmes: {error}</p>}
    </div>
  );
};

export default Home;
