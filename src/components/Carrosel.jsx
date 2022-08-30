import PropTypes from 'prop-types';
import React from 'react';
import './Carrosel.css';

function Carrosel({ recommendations, type }) {
  const key = type === 'Meal' ? 'Drink' : 'Meal';
  return (
    <div className="items-wrapper">
      <div
        className="items"
      >
        {
          recommendations.map((recommendation, index) => (
            <div
              className="item"
              key={ `${recommendation[`str${key}`]}${index}` }
              data-testid={ `${index}-recomendation-card` }
            >
              <img
                className="img-carr"
                src={ recommendation[`str${key}Thumb`] }
                alt="img"
              />
              <p
                data-testid={ `${index}-recomendation-title` }
              >
                { recommendation[`str${key}`]}
              </p>
            </div>
          ))
        }
      </div>

    </div>
  );
}

Carrosel.propTypes = {
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default Carrosel;
