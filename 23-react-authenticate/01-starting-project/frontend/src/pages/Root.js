import {Outlet, useLoaderData, useSubmit} from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import {useEffect} from "react";
import {getTokenDuration} from "../util/auth";

function RootLayout() {
    const token = useLoaderData()
    const submit = useSubmit()
    // const navigation = useNavigation();
    //토큰이 없다면 무시, 토큰이 있다면 1시간이 지난경우, 자동 로그아웃처리를 진행.
    useEffect(() => {
        if (!token) {
            return;
        }
        if (token === 'EXPIRED') {
            submit(null, {action: '/logout', method: 'POST'})
            return ;
        }
        const tokenDuration = getTokenDuration();

        setTimeout(() => {
            submit(null, {action: '/logout', method: 'POST'})
        }, tokenDuration)
    }, [token, submit]);

    return (
        <>
            <MainNavigation/>
            <main>
                {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
                <Outlet/>
            </main>
        </>
    );
}

export default RootLayout;
