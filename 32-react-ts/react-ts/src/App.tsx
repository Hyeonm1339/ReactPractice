import Todos from "./components/Todos";
import Todo from './models/todo';
import NewTodo from "./components/NewTodo";
import {useState} from "react";

function App() {
    // const todos: Todo[] = [
    //     new Todo('Learn React'),
    //     new Todo('Learn TypeScript')
    // ];

    const [todos, setTodos] = useState<Todo[]>([])

    function handlerAddTodo(todoText: string) {
        const newTodo = new Todo(todoText);
        setTodos((prevState) => {
            // return [...prevState, newTodo];
            //기존 데이터에 신규데이터를 합쳐서 리턴한다.
            return prevState.concat(newTodo);
        });
    }

    function handlerDeleteTodo(todoId:string){
        setTodos((prevState)=>{
            return prevState.filter((todo) => todo.id !== todoId);
        })
    }

    return (
        <div>
            <NewTodo onAddTodo={handlerAddTodo}/>
            <Todos items={todos} onRemoveTodo={handlerDeleteTodo}/>
        </div>
    );
}

export default App;
