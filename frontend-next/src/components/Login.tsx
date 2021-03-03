import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Login.module.css';

export function Login() {
    const { changeUserStatus } = useContext(ChallengesContext);
    const [isValidated, setIsValidated] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [username, setUsername] = useState("");

    // useEffect(() => {
    //     if(isValidated)
    //     {
    //         fetch(`https://api.github.com/users/${username}`, {method:'GET', 
    //         headers: {'Authorization': 'Basic ' + btoa('login:password')}})
    //             .then(res => res.json())
    //             .then(
    //                 (result) => {
    //                     console.log("Result", result);
    //                     if(!result.id)
    //                     {
    //                         setShowMessage(true); 
    //                         setIsValidated(false);
    //                     }
    //                     else
    //                     {
    //                         setIsValidated(true);
    //                         setShowMessage(false); 
    //                     }
    //                 },
    //                 (error) => {
    //                     console.log("Error", error);
    //                     setShowMessage(true);
    //                     setIsValidated(false);
    //                 }
    //             )
    //     }
    // }, [isValidated]);

    function handleUsername (e) {
        setUsername(e.target.value)
    }

    return (
        <div className={styles.loginContainer}>
            <img src="icons/moveit_white.png" alt="Logo Move.It" className={styles.logo}/>
            <h2 className={styles.welcome}>Bem-vindo</h2>
            <div className={styles.githubDiv}>
                <img src="icons/github.png" alt="Github"/>
                <p className={styles.description}>Faça login com seu GitHub <br/>para começar</p>
            </div>
            <input type="text" className={styles.username} placeholder="Digite seu username" onChange={handleUsername} />
            <button className={styles.submitLogin} onClick={() => setIsValidated(true)}>
                <img src="icons/right-arrow.svg" alt="Enviar"/>
            </button>
            {showMessage && <p className={styles.errorMessage}>Usuário invalido! Verifique se informou o usuário certo.</p>}
        </div>
    );
}