import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {

    await new Promise((resolve) => setTimeout(resolve, 2000))
    //run()은 데이터를 insert,update할때 사용하고, ALL은 조회용도로 사용한다.
    return db.prepare('SELECT * FROM meals').all();
}