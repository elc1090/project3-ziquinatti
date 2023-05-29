import Header from "components/Header";
import { useJogar } from "context/Jogar";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    const { usuario, startUser } = useUsuario();
    const { startJogar } = useJogar();

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

        const fetchJogar = async (id) => {
            const resp = await fetch(`http://localhost:9000/lists/${id}`).catch (error => console.log('Sem jogos!!!'));
            if(resp){
                const dados = await resp.json();
                return dados.jogar;
            }
            return null;
        }

        if(!usuario){
            fetchData()
                .then(dados => {
                    startUser(dados);
                    if(dados)
                        fetchJogar(dados.id).then(dados => startJogar(dados));
                })
        }
    }, []);
    
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}