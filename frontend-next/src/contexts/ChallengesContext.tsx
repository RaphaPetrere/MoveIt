import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number; 
    challengesCompleted: number; 
    experienceToNextLevel: number; 
    activeChallenge: Challenge;
    userLoggedOn: boolean;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    finishChallenge: () => void;
    closeLevelUpModal: () => void;
    changeUserStatus: (status : boolean) => void;
}

interface ChallengesProviderProps {
    children: ReactNode;
    level: number,
    currentExperience: number,
    challengesCompleted: number,
    userLoggedOn: boolean,
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [userLoggedOn, setUserLoggedOn] = useState(rest.userLoggedOn ?? false);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('userLoggedOn', String(userLoggedOn));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));
    }, [level, userLoggedOn, currentExperience, challengesCompleted]);

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted')
        {
            new Notification('Novo Desafio 🎉', {
                body: `Valendo ${challenge.amount}xp!`
            });
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }
    
    function finishChallenge() {
        if(!activeChallenge)
            return;

        let finalExperience = currentExperience + activeChallenge.amount;
        setChallengesCompleted(challengesCompleted + 1);
        if(finalExperience > experienceToNextLevel)
        {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);       
        resetChallenge();
    }

    function changeUserStatus(status) {
        setUserLoggedOn(status);
    }

    return (
        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted, 
                activeChallenge,
                experienceToNextLevel,
                userLoggedOn,
                levelUp,
                startNewChallenge,
                resetChallenge,
                finishChallenge,
                closeLevelUpModal,
                changeUserStatus,
            }}
        >
            {children}
            { isLevelUpModalOpen && <LevelUpModal /> }
        </ChallengesContext.Provider>
    );
}