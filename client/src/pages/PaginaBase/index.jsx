import Header from "components/Header";
import { Outlet } from "react-router-dom";

export default function PaginaBase() {
    return(
        <main>
            <Header />
            <Outlet />
        </main>
    );
}