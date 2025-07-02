import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Results from "./components/Results.jsx";
import {useState} from "react";

function App() {

    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10
    })

    const inputIsValid = userInput.duration > 0;

    function handleInputChange(inputIdentifier, newValue) {
        setUserInput(prevState => {
            return {
                ...prevState,
                [inputIdentifier]: +newValue,
            }
        })

    }


    return (
        <>
            <Header></Header>
            <UserInput onChange={handleInputChange} userInput={userInput} />
            {inputIsValid?<Results input={userInput}/>:<p className="center">Please enter a duration greater than zero.</p>}

        </>
    );
}

export default App;
