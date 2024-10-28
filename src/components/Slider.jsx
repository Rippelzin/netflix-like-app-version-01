import React, { useState } from 'react';
import styles from '../styles/Slider.module.css';
import Card from './Card';

const Slider = ({ filmesSeries }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredItem, setHoveredItem] = useState(null);
  const itemsToShow = 6;
  const totalItems = filmesSeries.length;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalItems - itemsToShow + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % (totalItems - itemsToShow + 1));
  };

  return (
    <div className={styles.container}>
      <button onClick={handlePrev} className={styles.arrow}>←</button>
      <div className={styles.slider} style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}>
        {filmesSeries.map((item, index) => (
          <Card info={item} />
        ))}
      </div>
      <button onClick={handleNext} className={styles.arrow}>→</button>
    </div>
  );
};

export default Slider;
