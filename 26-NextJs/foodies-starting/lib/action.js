//별도의 JS로 분리할경우 맨위에 선언해주면 모두 서버액션처리가 가능하다.
'use server';

import {saveMeal} from "@/lib/meal";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text) {
    return !text || text.trim() === ''
}

export async function shareMeal(prevState, formData) {
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email")
    }

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image || meal.image.size === 0) {
        return {
            message: '유효한 입력값을 넣어주세요.'
        };
    }


    await saveMeal(meal);
    // 넥스트는 공격적인 캐싱처리를 한다. 빌드될때 모든 데이터를 가지고와 정적페이지를 구성하므로,
    // 이후 추가적인 데이터를 등록하더라도 화면이 새롭게 캐싱되지 않는다. 이를 해결하기 위해, 데이터가 신규등록될때 리빌드 요청을하는 함수를 호출해야 한다.
    // 두번째 인자는 layout, page로 전달이 가능하며, page가 기본값이다. layout은 중첩된 모든 페이지를 재 캐싱한다는 의미.
    revalidatePath('/meals', 'page');
    redirect('/meals')
}
