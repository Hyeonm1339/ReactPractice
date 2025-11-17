import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    // throw new Error('Loading meals failed');
    //run()은 데이터를 insert,update할때 사용하고, ALL은 조회용도로 사용한다.
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug){
    //SQL 인젝션 방지를 위해 = ' + slug가 아닌, get()을 통해서 파라미터를 전달한다.
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}