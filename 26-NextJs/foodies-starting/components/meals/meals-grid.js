import classes from "./meals-grid.module.css";
import MealItem from "@/components/meals/meal-item";

export default function MealsGrid({meals}) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id} className={classes.meals}>
                    <MealItem {...meal}/>
                </li>
            ))}
        </ul>
    )
}