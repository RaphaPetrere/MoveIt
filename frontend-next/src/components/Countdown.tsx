import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Countdown.module.css';

export function Countdown() {
    const { startNewChallenge, resetChallenge, activeChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(0.1 * 60);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    useEffect(() => {
        if(activeChallenge && time > 0)
        {
            setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }
        else
        {
            if(!activeChallenge && time > 0)
            {
                setTime(0.1 * 60);
            }
            else if (activeChallenge && time == 0)
            {
                setHasFinished(true);
            }
            else
            {
                setHasFinished(false);
                setTime(0.1 * 60);
            }
        } 
            
    }, [activeChallenge, time]);

    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            { (activeChallenge && hasFinished) ? (
                <button 
                    disabled
                    className={styles.countdownButton}
                >
                    Ciclo encerrado
                </button>
            )
            :
            (
                <>
                {activeChallenge ? 
                    (
                        <button 
                            type="button" 
                            className={`${styles.countdownButton} ${styles.countdownButtonActive}`} 
                            onClick={resetChallenge}
                        >
                            Abandonar ciclo
                        </button>
                    )
                    :
                    (
                        <button 
                            type="button" 
                            className={styles.countdownButton} 
                            onClick={startNewChallenge}
                        >
                            Iniciar um ciclo
                        </button>
                    )
                }
                </>
            )}
        </div>
    );
}