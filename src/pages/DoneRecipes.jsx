import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import LogoDone from '../images/Logo-done-recipes.svg';
import Receitapp from '../images/ReceitappTittle.svg';
import shareIcon from '../images/shareIcon.svg';
import { getFromLocalStorage } from '../utils/getSetLocalStorage';
import './DoneRecipes.css';

const messageTimeOut = 2000;

function DoneRecipes() {
  const [filterDoneRercipes, setFilterDoneRecipes] = useState('all');
  const [isCopied, setIsCopied] = useState(false);
  const [doneRecipes] = useState(() => {
    const localStorageItem = getFromLocalStorage('doneRecipes');
    return localStorageItem || [];
  });

  const filterByCategory = ({ target: { value } }) => {
    setFilterDoneRecipes(value);
  };

  const filtred = filterDoneRercipes === 'all'
    ? doneRecipes
    : doneRecipes.filter(({ type }) => type === filterDoneRercipes);

  const shareRecipe = (id, type) => {
    clipboardCopy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, messageTimeOut);
  };

  // const { location: { pathname } } = useHistory();

  return (
    <div>
      <Header title="Done Recipes" searchButton={ false } />
      <div className="logos-dones-page">
        <img className="logo-done" src={ LogoDone } alt="logo-done" />
        <img src={ Receitapp } alt="receitapp" />
      </div>
      <div className="div-btns-recipes">
        <button
          className="btn-done-recipes"
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
          onClick={ (target) => filterByCategory(target) }
        >
          All
        </button>
        <button
          className="btn-done-recipes"
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ (target) => filterByCategory(target) }
        >
          Food
        </button>
        <button
          className="btn-done-recipes"
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ (target) => filterByCategory(target) }
        >
          Drinks
        </button>
      </div>

      { filtred.map((recipe, index) => (
        <div className="div-card-recipes" key={ recipe.id }>
          <div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="img-card-recipes"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt=""
              />
            </Link>
          </div>
          <div className="data-card-recipes">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <h2
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}

              </h2>
            </Link>
            <p
              className="name"
              data-testid={ `${index}-horizontal-top-text` }
            >
              {recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot }

            </p>
            <p
              className="done-date"
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate}

            </p>
            <button
              className="icon-share-recipes"
              type="button"
              src={ shareIcon }
              alt="share"
              data-testid={ `${index}-horizontal-share-btn` }
              onClick={ () => shareRecipe(recipe.id, recipe.type) }
            >
              <img src={ shareIcon } alt="share icon" />
            </button>
            { recipe.tags && (
              recipe.tags.map((tag) => (
                <span
                  key={ `${index}-${tag}` }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </span>
              ))
            )}

          </div>
        </div>
      ))}
      {
        isCopied && (
          <div className="is-copied-msg">
            <p>Link copied!</p>
          </div>
        )
      }

    </div>
  );
}

export default DoneRecipes;
