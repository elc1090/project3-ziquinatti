import JogoDetalhes from "components/JogoDetalhes";
import { useToPlay } from "context/ToPlay";

import styles from './ToPlay.module.css';

export default function ToPlay(){
    const { toPlay, addToPlay } = useToPlay();

    return(
        <section className={styles.jogos}>
            {toPlay.map((jogo) => {
                return <JogoDetalhes {...jogo} key={jogo.appid}/>;
            })}
        </section>
    );
}