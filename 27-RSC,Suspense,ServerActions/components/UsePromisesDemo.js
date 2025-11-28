'use client'

import {useState, use} from "react";

export default function UsePromisesDemo({usersPromise}) {
    //use훅을 통해서, 클라이언트 컴포넌트를 suspense기능과 통합 시킬 수 있다.
    const users = use(usersPromise);
    const [count, setCount] = useState(0);
    return (
        <div className="rsc">
            <h2>RSC with Data Fetching</h2>
            <p>
                Uses <strong>async / await</strong> for data fetching
            </p>
            <p>
                <button onClick={() => setCount(prevState => prevState + 1)}>Click me</button>
                <span>{count}</span>
            </p>
            <ul>
                {users.map(user => <li key={user.id}>{user.name} ({user.title})</li>)}
            </ul>
        </div>
    )
}