import {useState} from 'react';
import {Form, Link, useActionData, useNavigation, useSearchParams} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
    // const [isLogin, setIsLogin] = useState(true);
    //
    // function switchAuthHandler() {
    //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
    // }

    //action을 실행하고 난 다음 리턴받는 데이터. 라우터에서 action이 실행되어야 값이 존재한다.
    const data = useActionData();
    const navigation = useNavigation();

    //현재 라우터의 전달받은 파라미터를 가지고올수있는 훅,set은 여기서 사용할필요가 없어, 별도 구조분해하지 않는다.
    const [searchParams] = useSearchParams()
    const isLogin = searchParams.get('mode') === 'login';

    const isSubmitting = navigation.state === 'submitting'

    return (
        <>
            <Form method="post" className={classes.form}>
                <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
                {data && data.errors && (<ul>
                        {Object.values(data.errors).map(err =>
                            <li key={err}>
                                {err}
                            </li>)
                        }
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}
                <p>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" required/>
                </p>
                <p>
                    <label htmlFor="image">Password</label>
                    <input id="password" type="password" name="password" required/>
                </p>
                <div className={classes.actions}>
                    <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                        {isLogin ? 'Create new user' : 'Login'}
                    </Link>
                    <button disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Save'}
                    </button>
                </div>
            </Form>
        </>
    );
}

export default AuthForm;
