import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import './RecipeButtons.css';
import { getFromLocalStorage, setToLocalStorage } from '../utils/getSetLocalStorage';

const messageTimeOut = 2000;

const RecipeButtons = ({ favoriteRecipe }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(() => {
    const itemsStorage = getFromLocalStorage('favoriteRecipes');
    return itemsStorage?.some(({ id }) => id === favoriteRecipe.id);
  });

  const shareRecipe = (pathname) => {
    const url = pathname.replace('/in-progress', '');
    clipboardCopy(`http://localhost:3000${url}`);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, messageTimeOut);
  };

  const toggleFavorite = () => {
    setIsFavorite((prevFavorite) => !prevFavorite);
    setToLocalStorage('favoriteRecipes', favoriteRecipe);
  };

  const { location: { pathname } } = useHistory();
  return (
    <>
      <div className="buttons">
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => shareRecipe(pathname) }
        >
          <img src={ shareIcon } alt="share icon" />
        </button>
        <button
          type="button"
          onClick={ toggleFavorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
            alt="share icon"
          />
        </button>
      </div>
      {
        isCopied && (
          <div className="is-copied-msg">
            <p>Link copied!</p>
          </div>
        )
      }
    </>
  );
};

RecipeButtons.propTypes = {
  favoriteRecipe: PropTypes.shape({
    id: PropTypes.string,
  }).isRequired,
};

export default RecipeButtons;
