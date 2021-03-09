import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';
import { TwitterShareButton } from 'react-share';

export function LevelUpModal() {
    const { level, closeLevelUpModal } = useContext(ChallengesContext);
    let title = `Avancei para o próximo level ${level}`;
    let shareUrl = "http://twitter.com/bunnydelphine";
    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level.</p>

                <button className={styles.closeButton} type="button" onClick={closeLevelUpModal}>
                    <img src="/icons/close.svg" alt="Fechar Modal" />
                </button>
            </div>
            <div className={styles.footer}>
                <TwitterShareButton
                    url={shareUrl}
                    title={title}
                    className="Demo__some-network__share-button"
                >
                Compartilhar no Twitter
                    <img src="/icons/twitter_logo.png" alt="Twitter"/>
                </TwitterShareButton>
            </div>
        </div>
    )
}