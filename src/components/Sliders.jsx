import React, { useState } from 'react'
import SliderComponent from "../components/SliderComponent";

const Sliders = ({content, onCardClick}) => {

    function chunkArray(array, size) {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
          }
          return result
    }
      // Divide o array 'content' em grupos de 10 itens
  const contentChunk = chunkArray(content, 10).slice(0, 15); // Limita a 15 sliders

    
    
  return (
    <div>
       {contentChunk.map((contentChunk, index) => (
        <SliderComponent key={index} filmesSeries={contentChunk} onCardClick={onCardClick} />
      ))}
         
    </div>
  )
}

export default Sliders