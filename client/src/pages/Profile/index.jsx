import Jogo from "components/Jogo";
import { useJogos } from "context/Jogos";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";

import styles from './Profile.module.css';
import Title from "components/Title";
import { Link } from "react-router-dom";

export default function Profile() {
    const { usuario } = useUsuario();
    const { jogos, loadJogos } = useJogos();

    useEffect(() => {
        const fetchGames = async () => {
            const resp = await fetch('http://localhost:9000/games')
                .catch(() => console.log('Ocorreu um erro!'));
            if(resp){
                const dados = await resp.json();
                if(!dados.message){
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
                    <div className={styles.notLogin}>
                        <h2 className={styles.titulo}>OPS! Você não está logado</h2>
                        <p className={styles.texto}>Realize "Login" para vizualizar seus jogos e montar a sua lista de "Para Jogar"!</p>
                        <Link className={styles.login} to="http://localhost:9000/api/auth/steam">LOGIN</Link>
                    </div>
                </>
            }
        </section>
    );
}