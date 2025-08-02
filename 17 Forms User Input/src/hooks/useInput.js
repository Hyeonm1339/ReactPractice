import {useState} from "react";

export function useInput(defaultValie, validationFn) {
    const [enteredValue, setEnteredValue] = useState(defaultValie)
    const [didEdit, setDidEdit] = useState(false)

    const valueIsValid = validationFn(enteredValue);

    function handleInputChange(event) {
        setEnteredValue(event.target.value)
        setDidEdit(false);
    }

    function handleInputBlur() {
        setDidEdit(true)
    }

    return {
        value: enteredValue,
        handleInputChange,
        handleInputBlur,
        hasError: didEdit && !valueIsValid
    }
}