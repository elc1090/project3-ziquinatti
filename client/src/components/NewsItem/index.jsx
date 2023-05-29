import styles from "./NewsItems.module.css";

export default function NewsItem({ title, author, url }){
    return(
        <a className={styles.item} href={url} target="_blank">
            <h4>{title}</h4>
            <p>Autor: {author}</p>
        </a>
    );
}