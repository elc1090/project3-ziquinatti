import NaoLogado from "components/NaoLogado";
import { useUsuario } from "context/Usuario";
import styles from "./Home.module.css";
import News from "components/News";

export default function Home() {
    const { usuario } = useUsuario();

    return(
        <section>
            <div className={styles.intro}>
                <p className={styles.texto}>Bem-vindo(a) a SUA Steam, onde você pode gerenciar a sua lista de "afazeres"!</p>
                <p className={styles.texto}>Faça login para aproveitar o sistema de gerenciamento de jogos que você planeja jogar.</p>
                <p className={styles.lembrete}>*Lembrando que este site não está vinculado a Steam, apenas utiliza a API pública da mesma.</p>
            </div>
            { usuario ? 
                <>
                    <News />
                </>:
                <>
                    <NaoLogado />
                </>
            }
        </section>
    );
}