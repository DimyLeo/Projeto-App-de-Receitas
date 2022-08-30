import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Receitapp from '../images/ReceitappTittle.svg';
import shareIcon from '../images/shareIcon.svg';
import IconFavorite from '../images/Tittle Favorite.svg';
import { getFromLocalStorage, setToLocalStorage } from '../utils/getSetLocalStorage';
import './FavoriteRecipes.css';

const messageTimeOut = 2000;

function FavoriteRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  const [filterBtn, setFilterBtn] = useState('all');
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const favorites = getFromLocalStorage('favoriteRecipes');
    return favorites || [];
  });

  const shareRecipe = (id, type) => {
    clipboardCopy(`http://dimyleo.github.io/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, messageTimeOut);
  };

  const toggleFavorite = (recipe) => {
    setToLocalStorage('favoriteRecipes', recipe);
    setFavoriteRecipes(getFromLocalStorage('favoriteRecipes'));
  };

  const handleClick = ({ target: { value } }) => {
    setFilterBtn(value);
  };

  const mappedRecipes = filterBtn === 'all'
    ? favoriteRecipes
    : favoriteRecipes.filter((recipe) => recipe.type === filterBtn);

  return (
    <div className="div-favorite-page">
      <Header title="Favorite Recipes" searchButton={ false } />
      <div className="logos-favorite-page">
        <img className="favorite-re" src={ IconFavorite } alt="Favorite Recipes" />
        <img src={ Receitapp } alt="receitapp" />
      </div>
      <div className="filters-favorites">
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleClick }
          value="food"
        >
          Foods
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleClick }
          value="drink"
        >
          Drinks
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleClick }
          value="all"
        >
          All
        </button>
      </div>
      <div>
        {mappedRecipes.map((recipe, index) => (
          <div key={ recipe.name } className="RecipeFavoriteCard">
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div className="data-card-favorites">
              <p data-testid={ `${index}-horizontal-top-text` }>
                {recipe.type === 'food'
                  ? `${recipe.nationality} - ${recipe.category}`
                  : `${recipe.alcoholicOrNot}`}
              </p>
              <Link to={ `/${recipe.type}s/${recipe.id}` }>
                <p data-testid={ `${index}-horizontal-name` }>
                  {recipe.name}
                </p>
              </Link>
              <p data-testid={ `${index}-horizontal-done-date` }>
                {recipe.date}
              </p>
              <div className="buttons">
                <button
                  type="button"
                  onClick={ () => shareRecipe(recipe.id, recipe.type) }
                >
                  <img
                    data-testid={ `${index}-horizontal-share-btn` }
                    src={ shareIcon }
                    alt="share"
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => toggleFavorite(recipe) }
                >
                  <img
                    data-testid={ `${index}-horizontal-favorite-btn` }
                    src={ blackHeartIcon }
                    alt="share"
                  />
                </button>
              </div>
              <span data-testid={ `${index}-${recipe.type}-horizontal-tag` }>
                {recipe.type}
              </span>
            </div>
          </div>
        ))}
      </div>
      {
        isCopied && (
          <div
            data-testid="isCopied"
            className="is-copied-msg"
          >
            <p>Link copied!</p>
          </div>
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
