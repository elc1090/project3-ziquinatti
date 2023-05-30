import styles from './NaoLogado.module.css';
import { Link } from "react-router-dom";

export default function NaoLogado(){
    return(
        <div className={styles.notLogin}>
            <h2 className={styles.titulo}>OPS! Você não está logado</h2>
            <p className={styles.texto}>Realize "Login" para vizualizar seus jogos e montar a sua lista de "Para Jogar"!</p>
            <Link className={styles.login} to="https://my-steam-api.herokuapp.com/api/auth/steam">LOGIN</Link>
        </div>
    );
}