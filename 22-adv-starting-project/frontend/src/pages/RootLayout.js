import MainNavigation from "../components/MainNavigation";
import {Outlet} from "react-router-dom";

export default function RootLayout({ children }) {
    return <>
        <MainNavigation/>
        <main>
            <Outlet/>
        </main>
    </>

}