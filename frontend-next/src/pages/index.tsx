import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { ChallengesProvider } from '../contexts/ChallengesContext';

import { Login } from '../components/Login';

import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number,
  currentExperience: number,
  challengesCompleted: number,
};

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted}
    >
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
    </ChallengesProvider>
  )
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