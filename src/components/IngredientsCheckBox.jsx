import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import AppContext from '../context';
import usePersistedState from '../utils/usePersistedState';

const IngredientsCheckbox = ({
  ingredients: {
    ingredients,
    measures,
  },
}) => {
  const {
    setisFinishButtonDisabled,
  } = React.useContext(AppContext);
  const { location: { pathname } } = useHistory();
  const { id } = useParams();
  const [
    checkedIngredients,
    setCheckedIngredients,
  ] = usePersistedState('inProgressRecipes');
  const typeKey = pathname.includes('/foods')
    ? 'meals'
    : 'cocktails';
  const checkedArray = checkedIngredients?.[typeKey]?.[id];
  const isDisabled = checkedArray?.length !== ingredients.length;

  useEffect(() => {
    setisFinishButtonDisabled(isDisabled);
  }, [isDisabled, setisFinishButtonDisabled]);

  const handleChange = ({ target: { checked } }, index) => {
    if (!checked) {
      return setCheckedIngredients((prevState) => ({
        ...prevState,
        [typeKey]: {
          [id]: prevState?.[typeKey]?.[id]
            .filter((ingredientIndex) => ingredientIndex !== index),
        },
      }));
    }
    return setCheckedIngredients((prevState) => ({
      ...prevState,
      [typeKey]: {
        [id]: [...(prevState?.[typeKey]?.[id] || []), index],
      },
    }));
  };

  return (
    <ul>
      {ingredients.map((ingredient, index) => (
        <li
          key={ `${ingredient}${index}` }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          <label
            className="switch"
            htmlFor={ `${ingredient}${index}` }
            data-testid={ `${index}-ingredient-step` }
          >
            <div className="switch-wrapper">
              <input
                type="checkbox"
                id={ `${ingredient}${index}` }
                checked={ checkedArray?.includes(index) }
                onChange={ (event) => handleChange(event, index) }
              />
              <span className="switch-button" />
            </div>
            <span>
              {`${ingredient}`}
              {
                measures[index] && (
                  <span>{` - ${measures[index]}`}</span>
                )
              }
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
};

IngredientsCheckbox.propTypes = {
  ingredients: PropTypes.shape({
    ingredients: PropTypes.arrayOf(PropTypes.string),
    measures: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default IngredientsCheckbox;
