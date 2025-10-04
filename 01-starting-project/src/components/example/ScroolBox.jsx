import {useRef} from "react";

export default function ScrollBox() {
    const boxRef = useRef(null);

    const scrollToBottom = () => {
        boxRef.current.scrollTop = boxRef.current.scrollHeight;
    };

    return (
        <div>
            <div
                ref={boxRef}
                style={{height: 100, overflow: "auto", border: "1px solid gray"}}
            >
                {Array.from({length: 20}, (_, i) => (
                    <p key={i}>아이템 {i + 1}</p>
                ))}
            </div>
            <button onClick={scrollToBottom}>맨 아래로 이동</button>
        </div>
    );
}