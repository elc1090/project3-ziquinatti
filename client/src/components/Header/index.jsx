import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header(){
    return(
        <header className={styles.header}>
            <h1>MY STEAM</h1>
            <nav className={styles.navbar}>
                <NavLink to={process.env.PUBLIC_URL + '/'}>Home</NavLink>
                <NavLink to={process.env.PUBLIC_URL + '/profile'}>Profile</NavLink>
            </nav>
            <Link className={styles.login} to="http://localhost:9000/api/auth/steam">LOGIN</Link>
        </header>
    );
}