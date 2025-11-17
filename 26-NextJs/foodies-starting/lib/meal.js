import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from "slugify";
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {

    // await new Promise((resolve) => setTimeout(resolve, 2000))

    // throw new Error('Loading meals failed');
    //run()은 데이터를 insert,update할때 사용하고, ALL은 조회용도로 사용한다.
    return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
    //SQL 인젝션 방지를 위해 = ' + slug가 아닌, get()을 통해서 파라미터를 전달한다.
    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
    //모든문자를 소문자러 처리한다.
    meal.slug = slugify(meal.title, {lower: true});
    meal.instructions = xss(meal.instructions); //XSS공격방지를 위해 검열을 한다.

    //마지막 확장자를 확인한다.
    const extension = meal.image.name.split('.').pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const bufferedImage = await meal.image.arrayBuffer(); //이미지를 버퍼로 만든다. promise를 반환하므로 await로처리.
    //버퍼로 변환된 이미지를 쓴다. (처리가 되면 콜백함수를 호출해서 처리한다.
    stream.write(Buffer.from(bufferedImage), (error) => {
        //문제가 생겼다면 error가 반환, 정상처리라면 null
        if (error) {
            throw new Error('이미지 저장에 실패하였습니다.');
        }
    });
    //이미지 저장이 완료되었으면 나머지데이터를 저장해야한다.
    meal.image = `/images/${fileName}` //이미지는 요청시 자동으로 public요청이 들어가므로 public경로를 제거한다.
    db.prepare(`
        INSERT INTO meals
            (title, summary, instructions, creator, creator_email, image, slug)
        VALUES (@title, @summary, @instructions, @creator, @creator_email, @image, @slug)
    `).run(meal);
}