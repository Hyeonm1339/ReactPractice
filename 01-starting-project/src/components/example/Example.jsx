import {useRef} from "react";

export default function Example(){

    const inputRef = useRef(null);

    const focusInput = () => {
        inputRef.current.focus();
    };

    return (
        <div>
            <input ref={inputRef} type="text" placeholder="여기에 입력"/>
            <button onClick={focusInput}>포커스 주기</button>
        </div>
    );
}