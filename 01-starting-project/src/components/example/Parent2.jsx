import { forwardRef, useImperativeHandle, useRef } from "react";

// 자식 컴포넌트
const CustomInput = forwardRef((props, ref) => {
    const inputRef = useRef(null);

    // 부모가 사용할 수 있는 메서드 정의
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        },
        clear: () => {
            inputRef.current.value = "";
        }
    }));

    return <input ref={inputRef} type="text" placeholder="메서드 노출 예제" />;
});

// 부모 컴포넌트
function Parent2() {
    const inputRef = useRef(null);

    return (
        <div>
            <CustomInput ref={inputRef} />
            <button onClick={() => inputRef.current.focus()}>포커스</button>
            <button onClick={() => inputRef.current.clear()}>클리어</button>
        </div>
    );
}

export default Parent2;