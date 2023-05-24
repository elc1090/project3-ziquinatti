import { Link, NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { useUsuario } from 'context/Usuario';

export default function Header(){
    const { usuario } = useUsuario();

    return(
        <header className={styles.header}>
            <h1>MY STEAM</h1>
            <nav className={styles.navbar}>
                <NavLink to={process.env.PUBLIC_URL + '/'}>HOME</NavLink>
                <NavLink to={process.env.PUBLIC_URL + '/profile'}>PROFILE</NavLink>
                <NavLink to={process.env.PUBLIC_URL + '/toplay'}>TO PLAY</NavLink>
            </nav>
            { usuario ? 
                <Link className={styles.login} to="/">LOGOUT</Link> : 
                <Link className={styles.login} to="http://localhost:9000/api/auth/steam">LOGIN</Link>
            }
        </header>
    );
}