import React from "react";
import styles from "../styles/ConfirmationPopUp.module.css";

const ConfirmationPopUp = ({ message, onConfirm, onCancel }) => {
    console.log(message)
    return (
        <div className={styles.overlay}>
            <div className={styles.popup}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>
                        Sim
                    </button>
                    <button onClick={onCancel} className={styles.cancel}>
                        Não
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPopUp;
