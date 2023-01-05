import { useState, useEffect } from 'react';

import { IngredientIcon } from '../components';

import up from '../assets/up.png';
import under from '../assets/under.png';

const Burger = ({ ingredients, burgerState, active, setActive, totalPrice, setTotalPrise }) => {
  const [ifIngredients, setIfIngredients] = useState(false);

  useEffect(() => {
    const isIngredient = ingredients.find((el) => el.counter > 0);
    if (isIngredient) {
      setIfIngredients(true);
    } else {
      setIfIngredients(false);
    }
  }, [ingredients]);

  useEffect(() => {
    const sum = ingredients.reduce(function (total, amount) {
      if (amount.counter > 0) {
        return total + amount.counter * amount.price;
      }
      return total;
    }, 1);
    setTotalPrise(sum.toFixed(2));

    return () => setTotalPrise(1);
  }, [ingredients, setTotalPrise]);

  const renderIngredients = () => {
    return burgerState?.map((el) => {
      return <IngredientIcon key={Math.random() + el} ingredient={el} />;
    });
  };

  return (
    <div id='burger'>
      <span>Burger price: {totalPrice} $</span>
      <div className='burger-view'>
        <span>
          <img src={up} alt='up' />
        </span>
        <div className='ingredients-container'>
          {ifIngredients ? renderIngredients() : <div>Please start by adding products...</div>}
        </div>
        <span>
          <img src={under} alt='under' />
        </span>
      </div>
      <button className='button-54' onClick={() => setActive(!active)}>
        CHECKOUT
      </button>
    </div>
  );
};
export default Burger;
