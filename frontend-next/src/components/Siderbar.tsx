import Link from 'next/link';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Sidebar.module.css';

interface SidebarProps {
    page: string
}

export function Sidebar({page}: SidebarProps) {
    const { changeUserStatus } = useContext(ChallengesContext);
    return(
        <div className={styles.sidebarContainer}>
            <img src="icons/logo_small.png" alt="Logo Pequeno" className={styles.logo}/>
            <div className={styles.linkContainer}>
                <Link href="/">
                    <a>
                        <img src={`icons/home${page == 'home' ? '_purple' : ''}.png`} alt="home" id="homeIcon" />
                    </a>
                </Link>
                <Link href="/ranking">
                    <a>
                        <img src={`icons/trophy${page == 'ranking' ? '_purple' : ''}.png`} alt="ranking" id="rankingIcon" />
                    </a>
                </Link>
            </div>
            <Link href="/">
                <a onClick={() => changeUserStatus(false)}>
                    <img src="icons/logo_small.png" alt="logout" id="logoutIcon" />
                </a>
            </Link>
        </div>
    );
}