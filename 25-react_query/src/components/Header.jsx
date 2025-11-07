import {useIsFetching} from "@tanstack/react-query";

export default function Header({children}) {

    //페칭처리 중인지 확인하는값. 데이터를 가지고오지 않으면 0, 데이터를 가지고오면 숫자가 높아짐.
    const fetching = useIsFetching();

    return (
        <>
            <div id="main-header-loading">
                {/*리액트쿼리가 어떤 데이터를 가지고오는 행위를 할때마다 프로그레스를 표시한다.*/}
                {fetching > 0 && <progress/>}
            </div>
            <header id="main-header">
                <div id="header-title">
                    <h1>React Events</h1>
                </div>
                <nav>{children}</nav>
            </header>
        </>
    );
}
