import { useState, useEffect } from "react";
import MealItem from "./MealItem";

export default function Meals() {
    const [loadedMeals, setLoadedMeals] = useState([]);

    //useEffect allow us to run side effect after the components render and allow us to define the dependencies array to
    //controls when the side effect function run
    useEffect(()=>{
            //Must not convert components(Meals components) function to async function
        async function fetchMeals(){
            // GET request API to get meals data
        const response = await fetch('http://localhost:3000/meals');

        if(!response.ok){
            //...
        };

        //Dummy data is Json method when response send back to Json method to extracct data into javascript object
        const meals = await response.json();
        //update state UI data meals
        setLoadedMeals(meals);
    };

    fetchMeals();
    }, [])

    return (
        <ul id="meals">
            {loadedMeals.map ( 
                ( meal ) => 
                  (<MealItem key={meal.id} meal={meal}/>         
                             ))}
        </ul>
    );
};
