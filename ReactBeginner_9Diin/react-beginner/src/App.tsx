import React, {useEffect, useState} from "react";

function App() {

    //useState => Hooks
    //useState는 리액트에서 가장 기본적인 훅(Hook)이며, 컴포넌트에서 가변적인 상태를 지닐 수 있게 해준다.
    // 해당 함수는 배열을 반환하며, 첫번째 배열은 상태 값, 두번째 요소는 상태 값을 변경(설정)하는 함수를 반환한다.
    const [value, setValue] = useState<number>(0);
    const [name, setName] = useState<string>('현민');
    const [nickName, setNickName] = useState<string>('별명');

    const increment = () => {
        setValue((prevState) => {
            return prevState + 1
        })
    }
    const decrement = () => {
        setValue((prevState) => {
            return prevState - 1
        })
    }

    const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    }
    const onChangeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickName(event.target.value)
    }

    /*
        return (
            <div>
                <p>
                    현재 카운터 값은 : <b>{value}</b>
                </p>
                <button onClick={increment}>1 증가
                </button>
                <button onClick={decrement}>1 감소
                </button>

                <div>
                    <input type="text" value={name} onChange={onChangeName}/>
                    <input type="text" value={nickName} onChange={onChangeNickName}/>
                </div>

                <div>
                    <b>이름: {name}</b>
                    <b>별명: {nickName}</b>
                </div>
            </div>
        )
        */
    //useEffect는 리액트 컴포넌트가 랜더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 훅 이다.
    //마운트가 될때, 실행하고 싶을 때 사용한다.
    //마운트란 -> 리액트 DOM에 우리가 return 키워드 하단에 작성한 HTML, CSS영역 즉 UI가 붙었을때
    //맨 처음 렌더링 될때만 시행하고, 업데이트 될때는 실행하지 않으려면 빈배열을 전달해서 사용이 가능하다.

    //특정값이 업데이트 될 때만 실행하고 싶을 때, (특정값이 변경될때만 호출하고 싶은 경우)
    //두번째 파라미터(매개변수)에 특정값을 넣어서 처리한다. (디펜던시라고 칭함)

    useEffect(() => {
        console.log(`이름: ${name}, 별명: ${nickName}`);
    },[name])
    return (
        <div>
            <input type="text" value={name} onChange={onChangeName}/>
            <input type="text" value={nickName} onChange={onChangeNickName}/>

            <div>
                <b>이름: {name}</b>
                <b>별명: {nickName}</b>
            </div>
        </div>)


}

export default App
