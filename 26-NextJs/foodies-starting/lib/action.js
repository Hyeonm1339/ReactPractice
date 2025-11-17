//별도의 JS로 분리할경우 맨위에 선언해주면 모두 서버액션처리가 가능하다.
'use server';

import {saveMeal} from "@/lib/meal";
import {redirect} from "next/navigation";

export async function shareMeal(formData) {
    const meal = {
        title: formData.get("title"),
        summary: formData.get("summary"),
        instructions: formData.get("instructions"),
        image: formData.get("image"),
        creator: formData.get("name"),
        creator_email: formData.get("email")
    }

    await saveMeal(meal);
    redirect('/meals')
}
