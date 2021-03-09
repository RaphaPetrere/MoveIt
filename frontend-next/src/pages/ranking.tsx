import { GetServerSideProps } from 'next';
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
  };

export default function Ranking(props: RankingProps) {
    return (
        
        <ChallengesProvider 
            level={props.level} 
            currentExperience={props.currentExperience} 
            challengesCompleted={props.challengesCompleted}
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
                        {desafiantes.map((desafiante, index) => {
                            return (
                                <div className={styles.leaderboard} key={index}>
                                    <h5 className={styles.rank}>{index+1}</h5>
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

//Tudo feito aqui é executado no Node do Next, não no layout
export const getServerSideProps: GetServerSideProps = async (ctx) => { //Essa função manipula quais dados são passados da camada Next pro client
    const { level, currentExperience, challengesCompleted } = ctx.req.cookies;
    
    return {
      props: {    
        level: Number(level),
        currentExperience: Number(currentExperience),
        challengesCompleted: Number(challengesCompleted),
      }
    }
};