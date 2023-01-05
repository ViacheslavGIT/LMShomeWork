import minus from '../assets/minus_circle.svg';
import plus from '../assets/plus_circle.svg';
import { Loader } from './index';

const Controls = ({ controlsData, setIngredients, burgerState, setBurgerState, loading }) => {
  const handleCounter = (control, name) => {
    if (!control) return;
    let copiedData = [...burgerState];

    const newData = controlsData.map((el) => {
      if (el.name === name) {
        if (control === 'plus' && el.counter < 5 && burgerState.length < 10) {
          copiedData.unshift(name);
          return { ...el, counter: el.counter + 1 };
        } else if (control === 'minus' && el.counter > 0) {
          const index = copiedData.indexOf(name);
          if (index > -1) {
            copiedData.splice(index, 1);
          }
          return { ...el, counter: el.counter - 1 };
        }
      }
      return el;
    });

    setBurgerState(copiedData);
    setIngredients(newData);
  };

  const clearAll = () => {
    const clearData = controlsData.map((el) => {
      return { ...el, counter: 0 };
    });
    setIngredients(clearData);
    setBurgerState([]);
  };
  return (
    <div id='controls'>
      <span className='controls-header'>ingredients</span>
      <div className='controls-list'>
        {loading ? (
          <Loader />
        ) : (
          <>
            {controlsData.map((control) => (
              <div
                key={control._id}
                className='controls-item'
                onClick={(e) => handleCounter(e.target.alt, control.name)}
              >
                <div className='counter-wrapper'>
                  <img className='counter-btn minus' src={minus} alt='minus' />
                  <span className='counter'>{control.counter}</span>
                  <img className='counter-btn plus' src={plus} alt='plus' />
                </div>
                <div className='counter-name'>
                  <span>{control.name}</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {!loading && (
        <button className='button-54' onClick={() => clearAll()}>
          clear all
        </button>
      )}
    </div>
  );
};
export default Controls;
