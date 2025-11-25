import React, {useContext, useRef} from "react";
import classes from './NewTodo.module.css'
import {TodosContext} from "../store/todo-context";

const NewTodo: React.FC = () => {
    const todosCtx = useContext(TodosContext);
    const todoTextInputRef = useRef<HTMLInputElement>(null);
    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        //! 기호 타입스크립트에게 현시점에선 절대 null이 아니다 라는걸 명시. 옵셔널과는 다름.
        const enteredText = todoTextInputRef.current!.value;
        if (enteredText.trim().length === 0) {
            //에러처리
            return;
        }
        todosCtx.addTodo(enteredText);
        todoTextInputRef.current!.value = "";

    }
    return <form onSubmit={submitHandler} className={classes.form}>
        <label htmlFor="text">Todo Text</label>
        <input type="text" id="text" name="text" ref={todoTextInputRef}/>
        <button>Add Todo</button>
    </form>
}
export default NewTodo;