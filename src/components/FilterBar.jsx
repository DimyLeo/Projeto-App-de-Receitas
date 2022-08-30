import React, { useState } from 'react';
import AppContext from '../context';
import bomApetite from '../images/Bon Appetit.svg';
import fetchDispatch from '../utils/APIsFetch';
import './FilterBar.css';

// const numOfCategories = 5;

const FilterBar = () => {
  const { setItems, categories: { meals, drinks }, type } = React.useContext(AppContext);
  const [filter, setFilter] = useState('All');

  const categoriesMap = type === 'Meal'
    ? meals
    : drinks;

  const filterAll = async () => {
    const titleKey = type === 'Meal' ? 'foods' : 'drinks';
    const response = await fetchDispatch('', 'name', titleKey);
    setItems(response[titleKey === 'foods' ? 'meals' : titleKey]);
  };

  const filterCategory = async (filterType) => {
    const titleKey = type === 'Meal' ? 'foods' : 'drinks';
    const response = await fetchDispatch(
      filterType,
      'category',
      titleKey,
    );
    setItems(response[titleKey === 'foods' ? 'meals' : titleKey]);
  };

  const handleClick = (filterType) => {
    if (filterType === 'All' || (filter === filterType && filter !== 'All')) {
      filterAll();
      setFilter('All');
    } else {
      filterCategory(filterType);
      setFilter(filterType);
    }
  };

  return (
    <div className="div-filter">
      <img className="logo-apetite" src={ bomApetite } alt="bom-apetite" />
      <div className="FilterBar">
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => handleClick('All') }
        >
          All
        </button>
        {
          categoriesMap.map(({ strCategory }) => (
            <button
              key={ strCategory }
              type="button"
              data-testid={ `${strCategory}-category-filter` }
              onClick={ () => handleClick(strCategory) }
            >
              { strCategory }
            </button>

          ))
        }

      </div>
    </div>
  );
};

export default FilterBar;
