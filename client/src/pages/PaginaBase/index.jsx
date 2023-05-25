import Header from "components/Header";
import { useUsuario } from "context/Usuario";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    const { usuario, startUser } = useUsuario();

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://localhost:9000/api/user').catch (error => console.log('Ocorreu um erro!!'));
            if(resp){
                const dados = await resp.json();
                // console.log(dados);
                if(dados.message){
                    return null;
                }
                return dados;
            }
            return null;
        }

        if(!usuario){
            fetchData()
                .then(dados => startUser(dados));
        }
    }, []);
    
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}