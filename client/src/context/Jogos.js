import { createContext, useContext, useState } from "react";

export const JogosContext = createContext();
JogosContext.displayName = "Usuario";

export default function JogosProvider({ children }) {
    const [jogos, setJogos] = useState([]);

    return (
        <JogosContext.Provider
            value={{ jogos, setJogos }}
        >
            {children}
        </JogosContext.Provider>
    )
}

export function useJogos() {
    const { jogos, setJogos } = useContext(JogosContext);

    function loadJogos(listJogos) {
        return setJogos(listJogos);
    }

    return { jogos, loadJogos }
}