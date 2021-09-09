import React, { useEffect, useState } from "react";
import style_classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        "https://dummy-project-f7186-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseData = await response.json();

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);

      setIsloading(false);
    };

    fetchMeals().catch((err) => {
      setIsloading(false);
      setError(err.message);
    });
  }, []);

  if (error) {
    return (
      <section className={style_classes.mealsLoadingError}>
        <p>{error}</p>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className={style_classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  const mealList = meals.map((meals) => (
    <MealItem
      id={meals.id}
      key={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  return (
    <section className={style_classes.meals}>
      <Card>
        <ul>{mealList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
