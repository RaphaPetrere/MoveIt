import Head from 'next/head';

import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Ranking.module.css';
import { Sidebar } from '../components/Siderbar';
import { LeaderboardStanding } from '../components/LeaderboardStanding';

import desafiantes from '../../desafiantes.json';

interface RankingProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  userLoggedOn: boolean,
};

export default function Ranking(props: RankingProps) {
    console.log(desafiantes);
    return (
        <ChallengesProvider 
            level={props.level} 
            currentExperience={props.currentExperience} 
            challengesCompleted={props.challengesCompleted}
            userLoggedOn={props.userLoggedOn}
        >
            <div className={styles.container}>
                <Sidebar page="ranking"/>
                <div className={styles.rankingContainer}>
                    <Head>
                        <title>Ranking | move.it</title>
                    </Head>
                    <section>
                        <h1 className={styles.title}>Leaderboard</h1>
                        <div className={styles.description}>
                            <h5>Posição</h5>
                            <h5>Usuário</h5>
                            <h5>Desafios</h5>
                            <h5>Experiência</h5>
                        </div>
                        {desafiantes.map((desafiante) => {
                            return (
                                <div className={styles.leaderboard}>
                                    <h5 className={styles.rank}>1</h5>
                                    <LeaderboardStanding 
                                        username={desafiante.username}
                                        level={Number(desafiante.level)}
                                        challenges={Number(desafiante.challenges)}
                                        experience={Number(desafiante.experience)}
                                    />
                                </div>
                            )
                        }) }
                    </section>
                </div>
            </div>
        </ChallengesProvider>
    );
}