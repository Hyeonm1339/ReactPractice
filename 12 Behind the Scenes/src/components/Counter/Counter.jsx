import {memo, useCallback,  useMemo, useState} from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import {log} from '../../log.js';
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
    log(
        'Calculating if is prime number',
        2,
        'other'
    );
    if (number <= 1) {
        return false;
    }

    const limit = Math.sqrt(number);

    for (let i = 2; i <= limit; i++) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

//setCounter를 분리했으므로 MEMO함수는 삭제해도 된다. 단 공부를 위해 남겨두자.
//memo훅은 해당 컴포넌트에 파라미터로 들어오는 객체의 변화를 감지하여, 변화가없다면 렌더링을 막아주는 역할을 한다.
//많이 사용시에는 매번 객체를 체크해야 하므로, 성능적인 이슈가 발생할 수 있다.
const Counter = memo(function Counter({initialCount}) {
    log('<Counter /> rendered', 1);
    const initialCountIsPrime = useMemo(() => isPrime(initialCount), [initialCount]);

    // const [counter, setCounter] = useState(initialCount);

    // const handleDecrement = useCallback(() => {
    //     setCounter((prevCounter) => prevCounter - 1);
    // }, []);
    //
    // const handleIncrement = useCallback(() => {
    //     setCounter((prevCounter) => prevCounter + 1);
    // }, []);

    // useEffect(() => {
    //     setCounterChanges([{value: initialCount, id: Math.random() * 1000}])
    // }, [initialCount]);


    const [counterChanges, setCounterChanges] = useState([{value: initialCount, id: Math.random() * 1000}]);
    const currentCounter = counterChanges.reduce((prevCounter, counterChange) => prevCounter + counterChange.value, 0);

    const handleDecrement = useCallback(() => {
        setCounterChanges((prevCounterChanges) => [{value: -1, id: Math.random() * 1000}, ...prevCounterChanges]);
    }, []);

    const handleIncrement = useCallback(() => {
        setCounterChanges((prevCounterChanges) => [{value: +1, id: Math.random() * 1000}, ...prevCounterChanges]);
    }, []);

    return (
        <section className="counter">
            <p className="counter-info">
                The initial counter value was <strong>{initialCount}</strong>. It{' '}
                <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
            </p>
            <p>
                <IconButton icon={MinusIcon} onClick={handleDecrement}>
                    Decrement
                </IconButton>
                <CounterOutput value={currentCounter}/>
                <IconButton icon={PlusIcon} onClick={handleIncrement}>
                    Increment
                </IconButton>
            </p>
            <CounterHistory history={counterChanges}/>
        </section>
    );
})

export default Counter;
