'use server';
import fs from 'node:fs';

//비동기폼액션이 있는경우. 'use server' 지시문을 추가하면, 해당함수는 서버액션으로 변환된다.
export async function saveUserAction(formData) {
    console.log('Executed')
    const data = fs.readFileSync("dummy-db.json", 'utf-8');
    const instructors = JSON.parse(data);
    const newInstructor = {
        id: new Date().getTime().toString(),
        name: formData.get("name"),
        title: formData.get("title"),
    }
    instructors.push(newInstructor);
    fs.writeFileSync("dummy-db.json", JSON.stringify(instructors));
}