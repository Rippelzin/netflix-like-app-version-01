import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../styles/index.css";
import Card from './Card';

const SliderComponent = ({ filmesSeries, onCardClick }) => {
    const settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        rows: 1
    };

    return (
        <div className="slider-container">
          <Slider {...settings}>
            {filmesSeries.map((item, index) => (
                <Card 
                    info={item} 
                    key={index} 
                    onCardClick={() => onCardClick(item)} // Passa o item selecionado para o pai, nao eh a funcao onClick, eh a props onClick
                />
            ))}
          </Slider>
        </div>
    );
}

export default SliderComponent;
