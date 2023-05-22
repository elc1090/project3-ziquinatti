export default function Home() {
    function Logar() {
        window.location.href = 'http://localhost:9000/api/auth/steam';
    }

    return(
        <div>
            <p>Clique no botão para logar na Steam</p>
            <button onClick={Logar}>Login</button>
        </div>
    );
}