import { createContext, useContext, useState } from "react";

export const ToPlayContext = createContext();
ToPlayContext.displayName = "Usuario";

export default function ToPlayProvider({ children }) {
    const [toPlay, setToPlay] = useState([]);

    return (
        <ToPlayContext.Provider
            value={{ toPlay, setToPlay }}
        >
            {children}
        </ToPlayContext.Provider>
    )
}

export function useToPlay() {
    const { toPlay, setToPlay } = useContext(ToPlayContext);

    function addToPlay(novoJogo) {
        const repetido = toPlay.some(item => item.appid === novoJogo.appid);

        let novaLista = [...toPlay];

        if (!repetido){
            novaLista.push(novoJogo);
            return setToPlay(novaLista);
        }
        novaLista.splice(novaLista.indexOf(novoJogo), 1);
        return setToPlay(novaLista);
    }

    return { toPlay, addToPlay }
}