import NewsItem from "components/NewsItem";
import Title from "components/Title";
import { useJogar } from "context/Jogar";
import { useEffect, useState } from "react";
import styles from "./News.module.css";
import { useJogos } from "context/Jogos";

export default function News(){
    const { jogar } = useJogar();
    const { jogos } = useJogos();

    const [ jogo1, setJogo1 ] = useState();
    const [ jogo2, setJogo2 ] = useState();
    const [ jogo3, setJogo3 ] = useState();

    useEffect(() => {
        const fetchNews = async (game) => {
            const resp = await fetch(`https://my-steam-api.herokuapp.com/news?game=${game}`)
                .catch(() => console.log('Ocorreu um erro!'));
            if(resp){
                const dados = await resp.json();
                // console.log(dados)
                return dados;
            }
            return null;
        }

        let g1 = jogar[0] ? jogar[0].appid : null;
        let g2 = jogar[1] ? jogar[1].appid : null;
        let g3 = jogar[2] ? jogar[2].appid : null;

        fetchNews(g1).then(dados => setJogo1(dados));
        fetchNews(g2).then(dados => setJogo2(dados));
        fetchNews(g3).then(dados => setJogo3(dados));
    }, []);

    return(
        <>
            <Title>NOTÍCIAS</Title>
            { jogo1 &&
                <div className={styles.news}>
                    {jogo1.newsitems.map((jogo) => <NewsItem {...jogo} key={jogo.gid} />)}
                </div>
            }
            { jogo2 &&
                <div className={styles.news}>
                    {jogo2.newsitems.map((jogo) => <NewsItem {...jogo} key={jogo.gid} />)}
                </div>
            }
            { jogo3 &&
                <div className={styles.news}>
                    {jogo3.newsitems.map((jogo) => <NewsItem {...jogo} key={jogo.gid} />)}
                </div>
            }
        </>
    );
}