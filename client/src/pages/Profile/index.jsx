import Jogo from "components/Jogo";
import { useJogos } from "context/Jogos";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";

import styles from './Profile.module.css';

export default function Profile() {
    const { usuario, startUser } = useUsuario();
    const { jogos, loadJogos } = useJogos();

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://localhost:9000/api/user').catch (error => console.log('Ocorreu um erro!!'));
            const dados = await resp.json();
            console.log(dados);
            if(dados.message){
                return null;
            }
            return dados;
        }

        const fetchGames = async () => {
            const resp = await fetch('http://localhost:9000/games');

            const dados = await resp.json();
            console.log(dados.response.games);
            return dados.response.games;
        }

        if(!usuario){
            fetchData()
                .then(dados => startUser(dados));
            
            fetchGames()
                .then(dados => loadJogos(dados));
        }
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
                        <h2 className={styles.biblio}>BIBLIOTECA</h2>
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