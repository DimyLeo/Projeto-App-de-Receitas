import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import AppContext from '.';
import drinks from '../tests/mocks/drinks';
import meals from '../tests/mocks/meals';

const Provider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [type, setType] = useState(null);
  const [isFinishButtonDisabled, setisFinishButtonDisabled] = useState(true);
  const [categories] = useState({
    meals: [
      { strCategory: 'Beef' },
      { strCategory: 'Breakfast' },
      { strCategory: 'Chicken' },
      { strCategory: 'Dessert' },
      { strCategory: 'Goat' },
    ],
    drinks: [
      { strCategory: 'Ordinary Drink' },
      { strCategory: 'Cocktail' },
      { strCategory: 'Shake' },
      { strCategory: 'Other/Unknown' },
      { strCategory: 'Cocoa' },
    ],
  });

  const contextValue = {
    items,
    type,
    setType,
    setItems,
    categories,
    isFinishButtonDisabled,
    setisFinishButtonDisabled,
  };

  useEffect(() => {
    if (type === 'Meal') {
      setItems(meals.meals);
    }
    if (type === 'Drink') {
      setItems(drinks.drinks);
    }
  }, [type]);

  return (
    <AppContext.Provider value={ contextValue }>
      { children }
    </AppContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Provider;
