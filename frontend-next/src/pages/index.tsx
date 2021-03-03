import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengesProvider } from '../contexts/ChallengesContext';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Login } from '../components/Login';
import { Profile } from '../components/Profile';

import styles from '../styles/pages/Home.module.css';
import { Sidebar } from '../components/Siderbar';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
  userLoggedOn: boolean,
};

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
      userLoggedOn={props.userLoggedOn}
    >
      {props.userLoggedOn == true ?
        <div className={styles.container}>
          <Sidebar />
          <div className={styles.homeContainer}>
            <Head>
              <title>Início | move.it</title>
            </Head>
            
            <ExperienceBar />

            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </div>
        </div>
      :
        <div className={styles.loginContainer}>
          <Head>
            <title>Login | move.it</title>
          </Head>

          <section>
            <div>
              <img src="icons/logo_icon_login.png" alt="MoveIt Icon" className={styles.logoIconLogin}/>
            </div>
            <Login />
          </section>
        </div>
      }
    </ChallengesProvider>
  )
}

//Tudo feito aqui é executado no Node do Next, não no layout
export const getServerSideProps: GetServerSideProps = async (ctx) => { //Essa função manipula quais dados são passados da camada Next pro client
  const { level, currentExperience, challengesCompleted, userLoggedOn } = ctx.req.cookies;
  
  return {
    props: {    
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      userLoggedOn: Boolean(userLoggedOn),
    }
  }
};