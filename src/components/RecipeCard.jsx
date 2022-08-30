import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../context';
import './RecipeCard.css';

const RecipeCard = ({ index, src, name, id }) => {
  const { type } = React.useContext(AppContext);
  const route = type === 'Meal' ? `/foods/${id}` : `/drinks/${id}`;

  return (
    <div
      className="RecipeCard"
      data-testid={ `${index}-recipe-card` }
    >
      <Link
        to={ route }
      >
        <img
          src={ src }
          alt={ `${name} sprite` }
          data-testid={ `${index}-card-img` }
        />
        <p
          data-testid={ `${index}-card-name` }
          className="text-card"
        >
          { name }
        </p>
      </Link>
    </div>
  );
};

RecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default RecipeCard;
