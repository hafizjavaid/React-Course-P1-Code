import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
const burger = (props) => {
  let newIngradients = Object.keys(props.ingradients)
    .map((igKey) => {
      return [...Array(props.ingradients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
    if(newIngradients.length === 0)
    {
      newIngradients = (
          <p>Please Start Adding Ingradients</p>
      )
    }
 
  return (
    <div className="Burger">
      <BurgerIngredient type="bread-top"></BurgerIngredient>
      {newIngradients}
      <BurgerIngredient type="bread-bottom"></BurgerIngredient>
    </div>
  );
};

export default burger;
