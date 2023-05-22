import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    return(
        <main>
            <h1>MY STEAM</h1>
            <Outlet />
        </main>
    );
}