import React, { useState } from 'react'
import styles from "../styles/Card.module.css"

const Card = ({info}) => {

    const [isHovered, setIsHovered] = useState(null)
    const [view, setView] = useState(1)

    function handleClickArrow() {
        console.log(info)
    }

    const handleView = () => {
        if(view === 1){
            return "normal card"
        }
        else if(view === 2) {
            return "card hovered"
        }
        else if(view === 3) {
            return "card open"
        }
    }

  return (
    <div >
        {
            isHovered == null && (
            <div className={styles.card}>
                <img src={info.image} className={styles.img} alt="" 
                    onMouseEnter={() => setIsHovered(true)}
                    
                />
             </div>
            )
        }
        
        { isHovered == true &&  ( 
           
            <div className={styles.cardHovered}
                onMouseLeave={() => setIsHovered(null)}
            > 
                <img src={info.image} className={styles.img} alt="" />
                <div className={styles.carddisplay}>
                    <div>{info.name}</div>
                    <button className={styles.arrowbutton}>
                        <span className={styles.arrow} onClick={handleClickArrow}>&#x25BC;</span>
                    </button>
                </div>
                

            </div>
        )
            
        }
        
    </div>
  )
}

export default Card