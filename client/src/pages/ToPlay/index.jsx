import JogoDetalhes from "components/JogoDetalhes";
import { useToPlay } from "context/ToPlay";

import styles from './ToPlay.module.css';
import Title from "components/Title";
import { useUsuario } from "context/Usuario";

export default function ToPlay(){
    const { usuario } = useUsuario();
    const { toPlay, addToPlay, deleteToPlay } = useToPlay();

    async function saveToPlay(){
        await fetch(`http://localhost:9000/lists/update/${usuario.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                toPlay,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((resp) => resp.json())
            .then((resp) => console.log(resp));
    }

    return(
        <section>
            <Title>PARA JOGAR</Title>
            { toPlay.length !== 0 ?
                <>
                    <div className={styles.menu}>
                        <button 
                            className={styles.save}
                            onClick={saveToPlay}
                        >Salvar Lista</button>
                        <button
                            className={styles.delete}
                            onClick={deleteToPlay}
                        >Deletar Lista</button>
                    </div>
                    <div className={styles.jogos}>
                        {toPlay.map((jogo) => {
                            return <JogoDetalhes {...jogo} key={jogo.appid}/>;
                        })}
                    </div>
                </>:
                <>
                    <p>OPS! Sua lista está vazia.</p>
                    <p> Vá no menu "PROFILE" e adicione os jogos que planeja jogar.</p>
                </>
            }
            
        </section>
    );
}