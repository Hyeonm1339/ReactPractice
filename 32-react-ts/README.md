# React TypeScript에서 Context API를 활용한 상태 관리

## 1. 개요

이 글에서는 React와 TypeScript를 사용하여 Context API를 활용한 전역 상태 관리 방법을 소개합니다. 기존의 props drilling 방식에서 Context API를 사용하는 방식으로 리팩토링하는 과정을 다룹니다.

## 2. 프로젝트 구조

```
src/
  ├── components/
  │   ├── NewTodo.tsx
  │   ├── TodoItem.tsx
  │   └── Todos.tsx
  ├── models/
  │   └── todo.ts
  ├── store/
  │   └── todo-context.tsx
  └── App.tsx
```

## 3. Context API 적용 전 코드

### 3.1 App.tsx (기본 상태 관리)

```tsx
import { useState } from "react";
import Todo from "./models/todo";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (todoText: string) => {
    const newTodo = new Todo(todoText);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  return (
    <div>
      <NewTodo onAddTodo={addTodoHandler} />
      <Todos items={todos} onRemoveTodo={removeTodoHandler} />
    </div>
  );
}

export default App;
```

### 3.2 NewTodo.tsx

```tsx
import React, { useRef } from "react";

const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    
    if (enteredText.trim().length === 0) {
      return;
    }

    props.onAddTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={textInputRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
```

## 4. Context API 적용

### 4.1 Todo 모델 정의 (models/todo.ts)

```typescript
class Todo {
  id: string;
  text: string;

  constructor(todoText: string) {
    this.text = todoText;
    this.id = new Date().toISOString();
  }
}

export default Todo;
```

### 4.2 Context 생성 (store/todo-context.tsx)

```tsx
import React, { useState } from "react";
import Todo from "../models/todo";

type TodosContextObj = {
  items: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
};

export const TodosContext = React.createContext<TodosContextObj>({
  items: [],
  addTodo: () => {},
  removeTodo: (id: string) => {},
});

const TodosContextProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo = new Todo(text);
    setTodos((prevTodos) => prevTodos.concat(newTodo));
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== todoId));
  };

  const contextValue: TodosContextObj = {
    items: todos,
    addTodo: addTodoHandler,
    removeTodo: removeTodoHandler,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {props.children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
```

### 4.3 App.tsx (Context 적용 후)

```tsx
import React from "react";
import NewTodo from "./components/NewTodo";
import Todos from "./components/Todos";
import TodosContextProvider from "./store/todo-context";

function App() {
  return (
    <TodosContextProvider>
      <NewTodo />
      <Todos />
    </TodosContextProvider>
  );
}

export default App;
```

### 4.4 NewTodo.tsx (Context 사용)

```tsx
import React, { useContext, useRef } from "react";
import { TodosContext } from "../store/todo-context";

const NewTodo: React.FC = () => {
  const todosCtx = useContext(TodosContext);
  const textInputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    
    if (enteredText.trim().length === 0) {
      return;
    }

    todosCtx.addTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="text" ref={textInputRef} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default NewTodo;
```

### 4.5 Todos.tsx (Context 사용)

```tsx
import React, { useContext } from "react";
import TodoItem from "./TodoItem";
import { TodosContext } from "../store/todo-context";

const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul>
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
```

## 5. 장점

1. **Props Drilling 제거**: 중간 컴포넌트들을 거치지 않고도 상태와 핸들러에 접근 가능
2. **코드 가독성 향상**: 컴포넌트의 props가 간결해짐
3. **유지보수성 향상**: 상태 로직이 한 곳에서 관리되어 수정이 용이
4. **재사용성 증가**: Context Provider를 필요한 컴포넌트 트리에서 재사용 가능

## 6. 결론

Context API를 사용하면 전역 상태 관리를 더 효율적으로 할 수 있습니다. 특히 여러 컴포넌트에서 공통으로 사용되는 상태가 있을 때 유용하며, Redux와 같은 상태 관리 라이브러리의 사용 없이도 충분히 강력한 상태 관리를 구현할 수 있습니다.

이 예제를 기반으로 더 복잡한 애플리케이션에서도 Context API를 활용한 상태 관리를 적용해 보시기 바랍니다.
