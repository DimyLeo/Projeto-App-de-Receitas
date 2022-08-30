import PropTypes from 'prop-types';
import React from 'react';

const IngredientsList = ({
  ingredients: {
    ingredients,
    measures,
  },
}) => (
  <ul className="list-ingredients">
    {ingredients.map((ingredient, index) => (
      <li
        key={ `${ingredient}${index}` }
        data-testid={ `${index}-ingredient-name-and-measure` }
      >
        <span>{`${ingredient}`}</span>
        {
          measures[index] && (
            <span>{` - ${measures[index]}`}</span>
          )
        }
      </li>
    ))}
  </ul>
);

IngredientsList.propTypes = {
  ingredients: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measures: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default IngredientsList;
