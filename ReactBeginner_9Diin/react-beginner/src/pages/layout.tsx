import {AppFooter, AppHeader, } from "@/components/common";
import {Outlet} from "react-router";

export const RootLayout = () => {
    return (
        <div className="page">
            <AppHeader/>
            <div className="container">
                <Outlet/>
            </div>
            <AppFooter/>
        </div>
    );
};

