import { useState, useEffect } from 'react';
import axios from 'axios';

import { Prices, Burger, Controls, Modal, OrderForm } from './index';

const defaulArrayData = [];

const ContentPage = () => {
  const [prices, setPrices] = useState(defaulArrayData);
  const [ingredients, setIngredients] = useState(defaulArrayData);
  const [burgerState, setBurgerState] = useState(defaulArrayData);
  const [successActive, setSuccessActive] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrise] = useState(1);
  const [showOrderError, setShowOrderError] = useState(false);

  const clearModal = () => {
    setShowOrderError(false);
    setSuccessActive(false);
  }

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get('https://burger-api-xcwp.onrender.com/ingredients');
        const updatedData = response.data.map((el) => ({ ...el, counter: 0 }));
        setPrices(updatedData);
        setIngredients(updatedData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div id='content-wrapper'>
      <Prices prices={prices} loading={loading} />
      <Burger
        ingredients={ingredients}
        burgerState={burgerState}
        active={modalActive}
        setActive={setModalActive}
        totalPrice={totalPrice}
        setTotalPrise={setTotalPrise}
      />
      <Controls
        controlsData={ingredients}
        setIngredients={setIngredients}
        burgerState={burgerState}
        setBurgerState={setBurgerState}
        loading={loading}
      />
      {successActive ? (
        <Modal active={modalActive} setActive={setModalActive} clearModal={clearModal}>
          <div>
            You have successfully completed the order! Our courier will contact you shortly...
          </div>
        </Modal>
      ) : (
        <Modal active={modalActive} setActive={setModalActive} clearModal={clearModal}>
          {totalPrice > 1 ? (
            <OrderForm
              order={ingredients}
              totalPrice={totalPrice}
              setBurgerState={setBurgerState}
              controlsData={ingredients}
              setIngredients={setIngredients}
              setSuccessActive={setSuccessActive}
              setModalActive={setModalActive}
              showOrderError={showOrderError}
              setShowOrderError={setShowOrderError}
            />
          ) : (
            <div>Please start by adding products...</div>
          )}
        </Modal>
      )}
    </div>
  );
};
export default ContentPage;
