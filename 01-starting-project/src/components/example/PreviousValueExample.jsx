import {useEffect, useRef, useState} from "react";

export default function PreviousValueExample() {
    const [count, setCount] = useState(0);
    const prevCount = useRef(count);

    useEffect(() => {
        prevCount.current = count; // 렌더링 후 현재 값을 저장
    }, [count]);

    return (
        <div>
            <p>현재 값: {count}</p>
            <p>이전 값: {prevCount.current}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    );
}

