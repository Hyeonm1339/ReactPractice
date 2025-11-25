import Todo from "../models/todo";
import React, {useState} from "react";

type TodosContextObj = {
    items: Todo[];
    addTodo: (todoText: string) => void;
    removeTodo: (todoId: string) => void
}

export const TodosContext = React.createContext<TodosContextObj>({
    items: [],
    addTodo: (todoText: string) => {
    },
    removeTodo: (todoId: string) => {
    }
});

const TodosContextProvider: React.FC<{
    children: React.ReactNode
}> = (props) => {
    const [todos, setTodos] = useState<Todo[]>([])

    function handlerAddTodo(todoText: string) {
        const newTodo = new Todo(todoText);
        setTodos((prevState) => {
            // return [...prevState, newTodo];
            //기존 데이터에 신규데이터를 합쳐서 리턴한다.
            return prevState.concat(newTodo);
        });
    }

    function handlerDeleteTodo(todoId: string) {
        setTodos((prevState) => {
            return prevState.filter((todo) => todo.id !== todoId);
        })
    }

    const contextValue: TodosContextObj = {
        items: todos,
        addTodo: handlerAddTodo,
        removeTodo: handlerDeleteTodo
    };
    return <TodosContext.Provider value={contextValue}>
        {props.children}
    </TodosContext.Provider>
}

export default TodosContextProvider;