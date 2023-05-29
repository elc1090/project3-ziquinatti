import Jogo from "components/Jogo";
import { useJogos } from "context/Jogos";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";

import styles from './Profile.module.css';
import Title from "components/Title";

export default function Profile() {
    const { usuario } = useUsuario();
    const { jogos, loadJogos } = useJogos();

    useEffect(() => {
        const fetchGames = async () => {
            const resp = await fetch('http://localhost:9000/games')
                .catch(() => console.log('Ocorreu um erro!'));
            if(resp){
                if(resp.status !== 500){
                    const dados = await resp.json();
                    return dados.response.games;
                }
                return null;
            }
            return null;
        }

        fetchGames()
            .then(dados => loadJogos(dados));
    }, []);

    return(
        <section>
            { usuario ? 
                <>
                    <div className={styles.perfil}>
                        <img src={usuario.photos[2].value} alt="Imagem do Perfil" />
                        <p>Bem vindo, {usuario.displayName}</p>
                    </div>
                    <div>
                        <Title>BIBLIOTECA</Title>
                        <div className={styles.jogos}>
                            {jogos.map((jogo) => {
                                return(
                                    <Jogo {...jogo} key={jogo.appid}/>
                                )
                            })}
                        </div>
                    </div>
                </>:
                <>
                    <h2>Você não está logado</h2>
                </>
            }
        </section>
    );
}