import { useContext } from 'react';

import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Dashboard.module.css';

import { Sidebar } from '../components/Siderbar';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';


interface DashboardProps {
    level: number,
    currentExperience: number,
    challengesCompleted: number,
  };

export default function Dashboard(props: DashboardProps) {
    const { level } = useContext(ChallengesContext);
    return (
        
        <ChallengesProvider 
            level={props.level} 
            currentExperience={props.currentExperience} 
            challengesCompleted={props.challengesCompleted}
        >
            <div className={styles.container}>
                <Sidebar page="challenges"/>

                <div className={styles.homeContainer}>
                    <Head>
                        <title>Início | move.it</title>
                    </Head>
                    
                    <ExperienceBar />

                    <section>
                    <div>
                        <Profile username="Raphael Cardoso Petrére" level={level} />
                        <CompletedChallenges />
                        <Countdown />
                    </div>
                    <div>
                        <ChallengeBox />
                    </div>
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