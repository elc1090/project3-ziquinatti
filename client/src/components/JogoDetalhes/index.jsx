import { useEffect, useState } from "react";

import styles from './JogoDetalhado.module.css';

export default function JogoDetalhes({ appid }) {
    const [jogo, setJogo] = useState();

    useEffect(() => {
        const fetchGames = async () => {
            const resp = await fetch(`http://localhost:9000/game/${appid}`);

            const dados = await resp.json();
            // console.log(dados[`${appid}`].data);
            return dados[`${appid}`].data;
        }

        fetchGames()
            .then((dados) => setJogo(dados));
    }, []);

    return(
        <div className={styles.jogo}>
            {jogo &&
                <>
                    <img src={jogo.header_image} alt="Capa do Jogo"/>
                    <div className={styles.info}>
                        <h3>{jogo.name}</h3>
                        <p>{jogo.short_description}</p>
                    </div>
                </>
            }
            
        </div>
    );
}