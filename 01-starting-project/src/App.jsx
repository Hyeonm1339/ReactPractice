import {useState} from "react";

import Header from "./components/Header/Header.jsx";
import CoreConcepts from "./components/CoreConcepts.jsx";
import Examples from "./components/Examples.jsx";
import Example from "./components/example/Example";
import ScrollBox from "./components/example/ScroolBox";
import PreviousValueExample from "./components/example/PreviousValueExample";
import ClickCounter from "./components/example/ClickCounter";
import Parent from "./components/example/Parent";
import Parent2 from "./components/example/Parent2";

function App() {
    return (
        <>
            <Header/>
            {/*<main>*/}
            {/*    <CoreConcepts/>*/}
            {/*    <Examples/>*/}
            {/*</main>*/}
            <Example/>
            <ScrollBox/>
            <PreviousValueExample/>
            <ClickCounter/>
            <Parent/>
            <Parent2/>
        </>
    );
}

export default App;
