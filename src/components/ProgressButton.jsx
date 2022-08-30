import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context';
import { getFromLocalStorage, setToLocalStorage } from '../utils/getSetLocalStorage';
import './ProgressButton.css';

const ProgressButton = ({ id, doneRecipe }) => {
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.includes('foods') ? 'Meal' : 'Drink';
  const inProgType = type === 'Meal' ? 'meals' : 'cocktails';
  const { isFinishButtonDisabled } = React.useContext(AppContext);

  const inProgressRecipes = getFromLocalStorage('inProgressRecipes');
  const isContinue = inProgressRecipes?.[inProgType]?.[id]
    ? 'Continue Recipe' : 'Start Recipe';

  const doneRecipes = getFromLocalStorage('doneRecipes');
  const isDone = doneRecipes
    && doneRecipes
      .some(({
        id: idRecipe, type: recipeType,
      }) => id === idRecipe && type === recipeType);

  const isInProgress = pathname.includes('in-progress');

  const startRecipe = () => {
    if (isContinue === 'Start Recipe') {
      const newValue = {
        ...(inProgressRecipes || {}),
        [inProgType]: {
          ...(inProgressRecipes?.[inProgType] || {}),
          [id]: [...(inProgressRecipes?.[inProgType]?.[id] || [])],
        },
      };

      // inProgressRecipes[inProgType] = {
      //   ...inProgressRecipes?.[inProgType],
      //   [id]: [...inProgressRecipes?.[inProgType]?.[id] || []],
      // };
      setToLocalStorage('inProgressRecipes', newValue);
      return history.push(`${pathname}/in-progress`);
    }

    history.push(`${pathname}/in-progress`);
  };

  const finishRecipe = () => {
    setToLocalStorage('doneRecipes', doneRecipe);
    history.push('/done-recipes');
  };

  return !isDone && (
    <div
      className="start-recipe"
      data-testid="start-recipe-btn"
    >
      {
        isInProgress
          ? (
            <button
              type="button"
              onClick={ finishRecipe }
              data-testid="finish-recipe-btn"
              disabled={ isFinishButtonDisabled }
            >
              Finish Recipe
            </button>

          )
          : (
            <button
              type="button"
              onClick={ startRecipe }
            >
              {isContinue}
            </button>
          )
      }
    </div>
  );
};

ProgressButton.propTypes = {
  id: PropTypes.string.isRequired,
  doneRecipe: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default ProgressButton;
