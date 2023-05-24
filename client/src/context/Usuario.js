import { createContext, useContext, useState } from "react";

export const UsuarioContext = createContext();
UsuarioContext.displayName = "Usuario";

export default function UsuarioProvider({ children }) {
    const [usuario, setUsuario] = useState();

    return (
        <UsuarioContext.Provider
            value={{ usuario, setUsuario }}
        >
            {children}
        </UsuarioContext.Provider>
    )
}

export function useUsuario() {
    const { usuario, setUsuario } = useContext(UsuarioContext);

    function startUser(user) {
        return setUsuario(user);
    }

    function endUser() {
        return setUsuario(null);
    }

    return { usuario, startUser, endUser }
}