import React, { useEffect, useState } from 'react';
import { Formik, Field } from 'formik';
import axios from 'axios';

import priceToNumber from '../helper/priceToNumber';
import { IngredientIcon, Loader } from './index';

const defaulArrayData = [];

const OrderForm = ({
  order,
  totalPrice,
  setBurgerState,
  controlsData,
  setIngredients,
  setSuccessActive,
  setModalActive,
  showOrderError,
  setShowOrderError,
}) => {
  const parsedPrice = priceToNumber(totalPrice);
  const [loader, setLoader] = useState(false);
  const [price, setPrice] = useState();

  useEffect(() => {
    if (parsedPrice) {
      setPrice(parsedPrice);
    }
  }, [parsedPrice]);

  const filteredOrder = order.filter((el) => el.counter > 0);

  const clearAll = () => {
    const clearData = controlsData.map((el) => {
      return { ...el, counter: 0 };
    });
    setIngredients(clearData);
    setBurgerState(defaulArrayData);
  };

  if (loader) return <Loader />;

  return (
    <>
      <span>Your Order</span>
      {filteredOrder.map((ingredient) => (
        <div key={ingredient._id} className='ingredient-item'>
          <IngredientIcon ingredient={ingredient.name} customStyle='icon' />
          <span>{ingredient.counter}</span>
        </div>
      ))}
      <Formik
        initialValues={{ name: '', phone: '', address: '', email: '', delivery: false }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = '* required';
          }
          if (!values.phone) {
            errors.phone = '* required';
          }
          if (!values.address) {
            errors.address = '* required';
          }
          if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = '* invalid email address';
          }
          return errors;
        }}
        onSubmit={(values) => {
          const body = {
            orderAddress: values.address,
            orderEmail: values.email && values.email,
            orderName: values.name,
            orderPhone: values.phone,
            orderFast: values.delivery,
            orderProducts: filteredOrder.reduce((a, v) => ({ ...a, [v.name]: v.counter }), {}),
            orderPrice: totalPrice,
          };
          try {
            setLoader(true);
            axios
              .post('https://burger-api-xcwp.onrender.com/orders', body)
              .then(function (response) {
                setSuccessActive(true);
                clearAll();
              });
          } catch (error) {
            console.error(error);
            setShowOrderError(true);
          } finally {
            setLoader(false);
          }
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <input
              className='order-input'
              type='text'
              name='name'
              placeholder='Enter name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <span className='error'>{errors.name && touched.name && errors.name}</span>

            <input
              className='order-input'
              type='email'
              name='email'
              placeholder='Enter email'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <span className='error'>{errors.email}</span>

            <input
              className='order-input'
              type='text'
              name='phone'
              placeholder='Enter phone number'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            <span className='error'>{errors.phone && touched.phone && errors.phone}</span>

            <input
              className='order-input'
              type='text'
              name='address'
              placeholder='Enter address'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            />
            <span className='error'>{errors.address && touched.address && errors.address}</span>
            <label className='quick-delivery'>
              <Field
                type='checkbox'
                name='delivery'
                onChange={(e) => {
                  handleChange(e);
                  if (e.target.checked) {
                    const updatedPrice = priceToNumber(Number(price) + 2);
                    setPrice(updatedPrice);
                  } else {
                    setPrice(parsedPrice);
                  }
                }}
              />
              Quick delivery
            </label>

            <div className='order-buttons-wrapper'>
              <button className='button-54 order-btn submit' type='submit' disabled={isSubmitting}>
                Submit
              </button>
              <button
                className='button-54 order-btn cancel'
                type='cancel'
                onClick={(e) => {
                  e.preventDefault();
                  setModalActive(false);
                }}
              >
                cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
      {showOrderError ? <span className='error'>Something went wrong! Please try again later</span> : null}
      <span>Total price: {price} $</span>
    </>
  );
};

export default OrderForm;
