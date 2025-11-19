import classes from './page.module.css'
import Image from "next/image";
import {getMeal} from "@/lib/meal";
import {notFound} from "next/navigation";

export async function generateMetadata({params}){
    const meal = getMeal(params.mealSlug);
    //넥스트에서 지원하는 기본함수로, 가장가까운 not-found.js를 찾아서 표기한다.
    if (!meal) {
        notFound();
    }
    return {
        title: meal.title,
        description: meal.summary,
    }
}
export default function MealDetailsPage({params}) {
    const meal = getMeal(params.mealSlug);

    //넥스트에서 지원하는 기본함수로, 가장가까운 not-found.js를 찾아서 표기한다ㅞdev
    if (!meal) {
        notFound();
    }

    meal.instructions = meal.instructions.replace(/\n/g, '<br>');

    return <>
        <header className={classes.header}>
            <div className={classes.image}>
                <Image src={meal.image} alt={meal.title} fill/>
            </div>
            <div className={classes.headerText}>
                <h1>{meal.title}</h1>
                <p className={classes.creator}>
                    by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
                </p>
                <p className={classes.summary}>{meal.summary}</p>
            </div>
        </header>
        <main>
            <p className={classes.instructions}
               dangerouslySetInnerHTML={{__html: meal.instructions}}>
            </p>
        </main>
    </>
}