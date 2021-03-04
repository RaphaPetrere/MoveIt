import styles from '../styles/components/LeaderboardStanding.module.css';
import { Profile } from './Profile';

interface StandingProps {
    username: string;
    level: number;
    challenges: number;
    experience: number;
}

export function LeaderboardStanding(props: StandingProps) {
    return (
        <div className={styles.standingContainer}>
            <Profile username={props.username} level={props.level}/>
            <h5 className={styles.stats}>
                <strong>{props.challenges}</strong> completados
            </h5>
            <h5 className={styles.stats}>
                <strong>{props.experience}</strong>xp
            </h5>
        </div>
    )
}