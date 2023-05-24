import { useUsuario } from "context/Usuario";

export default function Home() {
    const { usuario } = useUsuario();

    return(
        <section>
            <p>Olá, {usuario ? usuario.displayName : 'loading...'}</p>
        </section>
    );
}