import classes from './Auth.module.css';
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth";

const Auth = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector((state) => state.auth);
    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(authActions.login());
    }
    return (
        <main className={classes.auth}>
            <section>
                <form onSubmit={loginHandler}>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email'/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password {isAuthenticated && 1}</label>
                        <input type='password' id='password'/>
                    </div>
                    <button>Login</button>
                </form>
            </section>
        </main>
    );
};

export default Auth;
