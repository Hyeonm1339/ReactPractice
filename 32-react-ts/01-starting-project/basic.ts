//변수의 종류 number, string, boolean
//자료형 : array, objects
//함수형, 매개변수등

//기본형

let age: number; //숫자타입만 지정가능. (대문자로 쓰면 Number객체를 가르키게된다.)
age = 12.1;

let userName: string; //마찬가지로 소문자로 처리.
userName = 'Hyeonm1339';

let isInstructor: boolean; //참,거짓 타입.
isInstructor = false;

//자료형 정리
let hobbies: string[];
hobbies = ['A', 'B', 'C']; //문자형태의 배열만 가능.
hobbies.push('1');

let person: {
    name: string; age: number;
}; //객체타입을 지정한다. name,age만 설정이 가능하고 각각 문자,숫자 타입디ㅏ.

person = {
    name: 'Max',
    age: 32
}
//지정되지 않은 객체는 저장할 수 없다.
// person = {
//     isEmployee: true
// }

//person과 동일한 타입을 가진 객체를 배열형태로 가질 수 있다.
let people: {
    name: 'Max',
    age: 32
}[];

let course = 'React - The Complete Guid';
//타입을 지정하지 않았지만, 객체 초기화시 문자를 넣어줬으므로, 해당 변수의 타입은 string일것이라 추론된다.
// course = 1; 는 사용불가.

//문자이거나, 숫자가 될수있다, 조건문과 같은개념 조금더 유연하게 사용가능하다.
let anotherCourse: string | number = 'React - The Complete Guid';
anotherCourse = 1; //이때는 숫자로 변경도 가능하다.

//person이란 타입유형을 지정하는 개념, DTO를 설정하는것과 비슷하달까..?
type Person = {
    name: string;
    age: number;
}

let newPeople: Person;

//함수는 숫자를 받아서 + 해서 처리하므로 함수의 타입이 number 임을 추론가능하다. :number는 생략가능.
function add(a: number, b: number): number {
    return a + b;
}

//리턴이 없다면 해당함수의 타입추론값은 void다.
function printOutput(value: any) {
    console.log(value);
}

//제네릭을 사용해서 들어오는 파라미터에 따라 함수의 타입이 자동으로 추론된다.
function insertAtBeginning<T>(array: T[], value: T) {
    const newArray = [value, ...array];
    return newArray;
}

const demoArray = [1, 2, 3];

//이떄 들어오는건 number의 배열과, 숫자타입이 들어갔으므로, 리턴되는 값도 number[]로 추론이 가능한 상황.
const updatedArray = insertAtBeginning(demoArray, -1);
const stringArray = insertAtBeginning(['a', 'b', 'c'], 'e');
console.log(updatedArray)

