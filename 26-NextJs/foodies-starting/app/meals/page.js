
import {Suspense} from 'react';
import classes from './page.module.css'
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meal";
import React from "react";
import MealsLoadingPage from "@/app/meals/loading-out";

async function Meals(){
    const meals = await getMeals();
    return <MealsGrid meals={meals}/>
}

//서버컴포넌트는 async처리가 가능하다.
export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, create <span className={classes.highlight}>by you</span>
                </h1>
                <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
                <p className={classes.cta}>
                    <Link href="/meals/share">
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<p className={classes.loading}>Fetching meals...</p>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    )
}