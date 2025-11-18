'use client';

import classes from './page.module.css';
import ImagePicker from "@/components/meals/image-picker";
import {shareMeal} from "@/lib/action";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import {useFormState} from "react-dom";

export default function ShareMealPage() {

    // async function shareMeal(formData) {
    //     //'use client'와는 다르게 Server Action을 생성해서, 서버에서만 실행될 수 있게 보장된다. (async 필수)
    //     //JSP JSTL과같은 느낌..? NextJS가 알아서 경로를 설정해서 처리하게 도와준다.(클라이언트가 아닌 무조건 서버측임)
    //     'use server';
    //
    //     const meal = {
    //         title: formData.get("title"),
    //         summary: formData.get("summary"),
    //         instructions: formData.get("instructions"),
    //         image: formData.get("image"),
    //         name: formData.get("name"),
    //         creator_email: formData.get("email")
    //     }
    //
    //     console.log(meal)
    // }

    //액션객체를 넘겨받아서, 새로운 액션객체를 만들고 form에 넘겨주어야, useFormState사용이 가능하다.(인터셉터 같은 역활이랄까..?)
    const [state, formAction] = useFormState(shareMeal, {message: null});

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" required/>
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" required/>
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" required/>
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" required/>
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            rows="10"
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Your Image" name="image"/>
                    {state.message && <p>{state.message}</p>}
                    <p className={classes.actions}>
                        <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    );
}