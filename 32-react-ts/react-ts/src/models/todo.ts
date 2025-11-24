class Todo {

    //타입스크립트에서는 변수를 먼저 선언해야한다. (변수의 타입을 지정해주어야 하므로)
    id: string;
    text: string;

    constructor(todoText: string) {
        this.id = new Date().toISOString();
        this.text = todoText;
    }
}

export default Todo;