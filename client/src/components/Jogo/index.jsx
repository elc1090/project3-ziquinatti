import styles from './Jogo.module.css';

export default function Jogo({ name, appid, img_icon_url}) {
    return (
        <div className={styles.jogo}>
            <img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${img_icon_url}.jpg`} alt="Icone do jogo" />
            <p>{name}</p>
        </div>
    );
}