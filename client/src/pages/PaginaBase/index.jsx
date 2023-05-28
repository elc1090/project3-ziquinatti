import Header from "components/Header";
import { useToPlay } from "context/ToPlay";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    const { usuario, startUser } = useUsuario();
    const { toPlay, startToPLay } = useToPlay();

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://localhost:9000/api/user').catch(() => console.log("Falha na conexão"));
            if(resp){
                const dados = await resp.json();
                if(dados.message)
                    return null;
                return dados;
            }
            return null;
        }

        const fetchToPlay = async () => {
            const resp = await fetch(`http://localhost:9000/lists/${usuario.id}`).catch (error => console.log('Sem jogos!!!'));
            if(resp){
                const dados = await resp.json();
                return dados.toPlay;
            }
            return null;
        }

        if(!usuario){
            fetchData()
                .then(dados => startUser(dados))
        }

        if(usuario){
            fetchToPlay()
                .then(dados => console.log(dados))
        }
    }, []);

    
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}