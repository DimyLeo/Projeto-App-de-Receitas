import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context';
import fetchDispatch from '../utils/APIsFetch';
import './SearchBar.css';

function SearchBar({ title }) {
  const history = useHistory();
  const { setItems } = React.useContext(AppContext);
  const input = useRef();
  const [queryType, setQueryType] = useState(null);

  const handleChange = ({ target: { id } }) => {
    setQueryType(id);
  };
  const handleSearch = async () => {
    const { current } = input;
    const titleKey = title === 'foods' ? 'meals' : 'drinks';
    if (queryType && current.value) {
      if (queryType === 'firstLetter' && current.value.length > 1) {
        current.value = '';
        return global.alert('Your search must have only 1 (one) character');
      }
      const responseAPI = await fetchDispatch(current.value, queryType, title);
      if (!responseAPI[titleKey]) {
        current.value = '';
        return global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (responseAPI[titleKey].length === 1) {
        const itemId = Object.values(responseAPI[titleKey][0])[0];
        history.push(`/${title}/${itemId}`);
      }
      setItems(responseAPI[titleKey]);
    }
  };

  return (
    <div className="SearchBar">
      <div className="div-search">
        <img className="icon-search" src="https://images2.imgbox.com/7d/8f/Dn7bk2L9_o.png" alt="icon" />
        <input
          ref={ input }
          className="search-input"
          placeholder="O que deseja?"
          type="text"
          data-testid="search-input"
        />
      </div>
      <div className="label-inputs">
        <label className="label-search" htmlFor="ingredient">
          <input
            id="ingredient"
            className="ratios-search-bar"
            name="search"
            type="radio"
            data-testid="ingredient-search-radio"
            onChange={ handleChange }
          />
          Ingrediente
        </label>
        <label className="label-search" htmlFor="name">

          <input
            id="name"
            className="ratios-search-bar"
            name="search"
            type="radio"
            data-testid="name-search-radio"
            onChange={ handleChange }
          />
          Nome
        </label>

        <label className="label-search" htmlFor="firstLetter">
          <input
            id="firstLetter"
            className="ratios-search-bar"
            name="search"
            type="radio"
            data-testid="first-letter-search-radio"
            onChange={ handleChange }
          />
          Primeira Letra
        </label>

      </div>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSearch }
      >
        <img src="https://images2.imgbox.com/da/1b/hioYOZ3H_o.png" alt="button" />
      </button>
    </div>
  );
}

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SearchBar;
