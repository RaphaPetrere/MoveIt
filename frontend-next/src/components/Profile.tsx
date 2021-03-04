import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css';

interface ProfileStanding {
    username: string;
    level: number;
}

export function Profile(props: ProfileStanding) {
    const { level } = useContext(ChallengesContext);
    
    return (
        <div className={styles.profileContainer}>
            <img src="https://github.com/stephYatate.png" alt={props.username}/>
            <div>
                <strong>{props.username}</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {props.level}
                </p>
            </div>
        </div>
    );
}