import { forwardRef, useRef } from "react";

// 자식 컴포넌트
const CustomInput = forwardRef((props, ref) => {
    return <input ref={ref} type="text" placeholder="forwardRef 예제" />;
});

// 부모 컴포넌트
function Parent() {
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.focus(); // 부모에서 자식의 input DOM에 접근
    };

    return (
        <div>
            <CustomInput ref={inputRef} />
            <button onClick={handleFocus}>포커스 주기</button>
        </div>
    );
}

export default Parent;