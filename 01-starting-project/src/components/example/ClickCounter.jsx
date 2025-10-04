import { useRef, useState } from "react";

export default function ClickCounter() {
    const [renderCount, setRenderCount] = useState(0);
    const clickCountRef = useRef(0);

    const handleClick = () => {
        clickCountRef.current += 1; // 리렌더링 없이 값만 증가
        setRenderCount((prev) => prev + 1); // 렌더링 유발용
    };

    return (
        <div>
            <p>렌더링 횟수: {renderCount}</p>
            <p>버튼 클릭 횟수(useRef): {clickCountRef.current}</p>
            <button onClick={handleClick}>클릭</button>
        </div>
    );
}