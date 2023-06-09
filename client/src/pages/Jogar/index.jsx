import JogoDetalhes from "components/JogoDetalhes";
import { useJogar } from "context/Jogar";

import styles from './Jogar.module.css';
import Title from "components/Title";
import { useUsuario } from "context/Usuario";
import NaoLogado from "components/NaoLogado";

export default function Jogar(){
    const { usuario } = useUsuario();
    const { jogar, deleteJogar } = useJogar();

    async function saveJogar(){
        await fetch(`https://my-steam-api.herokuapp.com/lists/update/${usuario.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                jogar,
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
            { jogar.length !== 0 ?
                <>
                    <Title>PARA JOGAR</Title>
                    <div className={styles.menu}>
                        <button 
                            className={styles.save}
                            onClick={saveJogar}
                        >Salvar Lista</button>
                        <button
                            className={styles.delete}
                            onClick={deleteJogar}
                        >Deletar Lista</button>
                    </div>
                    <div className={styles.jogos}>
                        {jogar.map((jogo) => {
                            return <JogoDetalhes {...jogo} key={jogo.appid}/>;
                        })}
                    </div>
                </>:
                <NaoLogado />
            }
            
        </section>
    );
}