import Link from 'next/link';
import styles from '../styles/components/Sidebar.module.css';

export function Sidebar(page:string) {
    return(
        <div className={styles.sidebarContainer}>
            <img src="icons/logo_small.png" alt="Logo Pequeno" className={styles.logo}/>
            <div className={styles.linkContainer}>
                <Link href="/">
                    <a><img src="icons/home.png" alt="home"/></a>
                </Link>
                <Link href="/ranking">
                    <a><img src="icons/trophy.png" alt="ranking"/></a>
                </Link>
            </div>
            <button className="">
                <img src="icons/logo_small.png" alt="Perfil" className={styles.logo}/>
            </button>
        </div>
    );
}