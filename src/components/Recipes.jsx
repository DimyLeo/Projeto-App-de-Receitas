import React from 'react';
import AppContext from '../context';
import FilterBar from './FilterBar';
import RecipeCard from './RecipeCard';
import './Recipes.css';

const renderQuantity = 12;

function Recipes() {
  const { items, type } = React.useContext(AppContext);

  return (
    <section className="Recipes">
      <FilterBar />
      <div className="recipes-grid">
        {
          items.filter((_, index) => index < renderQuantity).map((item, index) => (
            <RecipeCard
              key={ item[`id${type}`] }
              id={ item[`id${type}`] }
              index={ index }
              src={ item[`str${type}Thumb`] }
              name={ item[`str${type}`] }
            />
          ))
        }
      </div>
    </section>
  );
}

export default Recipes;
