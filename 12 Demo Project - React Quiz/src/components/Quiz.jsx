import {useState} from "react";

import QUESTIONS from '../questions.js';
import quizCompleteImg from '../assets/quiz-complete.png';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuiestionIndex = userAnswers.length;
    const quizIsComplete = activeQuiestionIndex === QUESTIONS.length;

    function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevState => {
            return [...prevState, selectedAnswer]
        })
    }

    if (quizIsComplete) {
        return (<div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon"/>
            <h2>Quiz Completed!</h2>
        </div>)
    }

    const shuffledAnswers = [...QUESTIONS[activeQuiestionIndex].answers];
    shuffledAnswers.sort((a, b) => {
        return Math.random() - 0.5;
    })


    return (
        <div id="quiz">
            <div id="question">
                <h2>{QUESTIONS[activeQuiestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => (
                        <li key={answer} className="answer">
                            <button onClick={() => {
                                handleSelectAnswer(answer)
                            }}>{answer}</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>)
}