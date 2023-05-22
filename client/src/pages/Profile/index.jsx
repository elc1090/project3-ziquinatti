import { useEffect, useState } from "react";
import axios from 'axios';

export default function Profile() {
    const [user, setUser] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch('http://localhost:9000/api/user').catch (error => console.log('Ocorreu um erro!!'));
            const dados = await resp.json();
            // console.log(dados);
            return dados;
        }

        fetchData()
            .then(dados => setUser(dados));
    }, []);

    return(
        <>
            <p>Bem vindo, {user ? user.displayName : 'loading...'}</p>
            <img src={user ? user.photos[0].value : 'loading...'} alt="Imagem do Perfil" />
        </>
    );
}