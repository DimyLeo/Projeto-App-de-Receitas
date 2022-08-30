import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  const history = useHistory();

  const handleClick = (path) => {
    const { location: { pathname } } = history;
    if (pathname !== path) {
      history.push(path);
    } else {
      return null;
    }
  };

  return (
    <footer data-testid="footer" className="Footer">
      <button
        type="button"
        onClick={ () => handleClick('/drinks') }
      >
        <img
          src={ drinkIcon }
          className="img-footer"
          alt="drink"
          data-testid="drinks-bottom-btn"
        />
      </button>

      <button
        type="button"
        onClick={ () => handleClick('/foods') }
      >
        <img
          src={ mealIcon }
          className="img-footer"
          alt="meal"
          data-testid="food-bottom-btn"
        />
      </button>
    </footer>
  );
}

export default Footer;
