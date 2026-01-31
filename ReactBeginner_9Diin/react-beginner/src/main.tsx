import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import Index from './pages'
import {BrowserRouter, Route, Routes} from "react-router";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import {RootLayout} from "@/pages/layout.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";
import CreateTopic from "@/pages/topics/create.tsx";
import {Toaster} from "@/components/ui";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <Routes>
                    <Route element={<RootLayout/>}>
                        <Route index element={<Index/>}/>
                        <Route path="sign-up" element={<SignUp/>}/>
                        <Route path="sign-in" element={<SignIn/>}/>
                        <Route path="topics/create" element={<CreateTopic/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
            <Toaster richColors position="top-center"/>
        </ThemeProvider>
    </StrictMode>,
)
