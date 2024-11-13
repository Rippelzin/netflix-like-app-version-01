import React, { useState } from "react";
import styles from "../styles/Card.module.css";
import Banner from "./Banner";


const Card = ({ info, onCardClick  }) => {
  //passar o OnClick como prop para o componente aceitar onClick events
  return (
    <div>
      
        <div className={styles.card} >
          <img
            src={info.image}
            className={styles.img}
            alt=""
            
          />
          <button onClick={onCardClick}>clique aqui</button>
        </div>
    
    </div>
  );
};

export default Card;
