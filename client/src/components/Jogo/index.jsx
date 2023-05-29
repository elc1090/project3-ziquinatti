import { useJogar } from 'context/Jogar';
import styles from './Jogo.module.css';

export default function Jogo({ name, appid, img_icon_url}) {
    const { jogar, addJogar } = useJogar();
    const inList = jogar.some((item) => item.appid === appid);

    return (
        <div className={styles.jogo}>
            <div className={styles.info}>
                <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_icon_url}.jpg`} alt="Icone do jogo" />
                <p>{name}</p>
            </div>
            <button
                onClick={() => {
                    addJogar({appid});
                }}
            >{inList? "-" : "+"}</button>
        </div>
    );
}