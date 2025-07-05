import {useState, useRef} from "react";

export default function Player() {

    const playerName = useRef();

    const [enteredPlayerName, setEnteredPlayerName] = useState(null)


    function handleClick() {
        let inputName = playerName.current.value;
        if(inputName === ''){
            alert('이름을 입력후 진행하세요.')
            return false;
        }
        setEnteredPlayerName(inputName)
        playerName.current.value = '';
    }

    return (
        <section id="player">
            <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
            <p>
                <input ref={playerName} type="text"/>
                <button onClick={handleClick}>Set Name</button>
            </p>
        </section>
    );
}
