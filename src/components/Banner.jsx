import React from 'react';
import styles from '../styles/Banner.module.css';

const Banner = ({ item, onClose, handlePlayClick }) => {



    return (
        <div className={styles.banner_container}>
            <img src={item.image} alt={item.name} className={styles.banner_image} />
            <div className={styles.banner_content}>
                <div className={styles.banner_title}>{item.name}</div>
                <div className={styles.banner_info}>
                    <span>{item.duration}</span>
                    <span className={styles.ageRating}>{item.ageRating}</span>
                </div>
                <div className={styles.banner_description}>{item.description}</div>
                <div className={styles.banner_buttons}>
                    <button className={`${styles.banner_button} ${styles.play}`} onClick={() => handlePlayClick(item)}>Play</button>
                    <button className={`${styles.banner_button} ${styles.moreInfo}`}>More Info</button>
                </div>
            </div>
            <button onClick={onClose} className={styles.close_button}>✕</button>
        </div>
    );
};

export default Banner;
