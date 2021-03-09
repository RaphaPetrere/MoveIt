import Link from 'next/link';
import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Sidebar.module.css';

interface SidebarProps {
    page: string;
}

export function Sidebar(props: SidebarProps) {
    const { changeCurrentPage } = useContext(ChallengesContext);
    changeCurrentPage(props.page);
    return(
        <div className={styles.sidebarContainer}>
            <img src="icons/logo_small.png" alt="Logo Pequeno" className={styles.logo}/>
            <div className={styles.linkContainer}>
                <Link href="/dashboard">
                    <button>
                        <img src={`icons/home${props.page == 'challenges' ? '_purple' : ''}.png`} alt="challenges" id="challengesIcon" />
                    </button>
                </Link>
                <Link href="/ranking">
                    <button>
                        <img src={`icons/trophy${props.page == 'ranking' ? '_purple' : ''}.png`} alt="ranking" id="rankingIcon" />
                    </button>
                </Link>
            </div>
            <Link href="/">
                <a>
                    <img src="icons/logo_small.png" alt="logout" id="logoutIcon" />
                </a>
            </Link>
        </div>
    );
}