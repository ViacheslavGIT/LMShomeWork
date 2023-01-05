import tomato from '../assets/tomato.png';
import salad from '../assets/salad.png';
import cheese from '../assets/cheese.png';
import meat from '../assets/meat.png';
import onion from '../assets/onion.png';
import pickle from '../assets/pickle.png';

const IngredientIcon = ({ ingredient, customStyle }) => {
  const renderIngredients = (ingredient) => {
    let ingredientImg = '';
    switch (ingredient) {
      case 'tomato':
        ingredientImg = tomato;
        break;
      case 'cheese':
        ingredientImg = cheese;
        break;
      case 'salad':
        ingredientImg = salad;
        break;
      case 'meat':
        ingredientImg = meat;
        break;
      case 'onion':
        ingredientImg = onion;
        break;
      case 'pickle':
        ingredientImg = pickle;
        break;
      default:
        break;
    }
    return <img className={customStyle} src={ingredientImg} alt={ingredient} />;
  };

  return <>{renderIngredients(ingredient)}</>;
};
export default IngredientIcon;
