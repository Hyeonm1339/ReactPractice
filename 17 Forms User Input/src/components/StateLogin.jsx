import {useState} from "react";
import Input from "./Input.jsx";
import {isEmail, isNotEmpty, hasMinLength} from "../util/validation.js";
import {useInput} from "../hooks/useInput.js";

export default function StateLogin() {

    const {
        value: emailValue,
        handleInputBlur: handleEmailBlur,
        handleInputChange: handleEmailChange,
        hasError: emailHasError
    } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

    const {
        value: passwordValue,
        handleInputBlur: handlePasswordBlur,
        handleInputChange: handlePasswordChange,
        hasError: passwordHasError
    } = useInput('', (value) => hasMinLength(value, 6));

    function handleSubmit(e) {
        e.preventDefault()
        if(emailHasError || passwordHasError){
            return;
        }
        console.log(emailValue,passwordValue)
    }


    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            <div className="control-row">
                <Input label="Email" id="email" type="email"
                       onBlur={handleEmailBlur}
                       value={emailValue}
                       onChange={handleEmailChange}
                       error={emailHasError && 'Pleas enter a valid email!'}/>

                <Input label="PASSWORD" id="password" type="password"
                       onBlur={handlePasswordBlur}
                       value={passwordValue}
                       onChange={handlePasswordChange}
                       error={passwordHasError && 'Pleas enter a valid password!'}/>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
