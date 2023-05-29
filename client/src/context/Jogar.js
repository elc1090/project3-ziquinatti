import { createContext, useContext, useState } from "react";

export const JogarContext = createContext();
JogarContext.displayName = "Jogar";

export default function JogarProvider({ children }) {
    const [jogar, setJogar] = useState([]);

    return (
        <JogarContext.Provider
            value={{ jogar, setJogar }}
        >
            {children}
        </JogarContext.Provider>
    )
}

export function useJogar() {
    const { jogar, setJogar } = useContext(JogarContext);

    function startJogar(lista){
        return setJogar(lista);
    }

    function addJogar(novoJogo) {
        const repetido = jogar.some(item => item.appid === novoJogo.appid);

        let novaLista = [...jogar];

        if (!repetido){
            novaLista.push(novoJogo);
            return setJogar(novaLista);
        }
        novaLista.splice(novaLista.indexOf(novoJogo), 1);
        return setJogar(novaLista);
    }

    function deleteJogar(){
        let novaLista = [];
        return setJogar(novaLista);
    }

    return { jogar, addJogar, deleteJogar, startJogar }
}