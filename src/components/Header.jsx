import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import iconePerfil from '../images/profileIcon.svg';
import iconeSearch from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

function Header({ title, searchButton }) {
  const [renderSearch, setRenderSearch] = useState(false);

  const toggleSearchBar = (event) => {
    event.preventDefault();
    setRenderSearch((prevState) => !prevState);
  };

  const UpperCaseTitle = `${title[0].toUpperCase()}${title.slice(1)}`;

  return (
    <header className="Header">
      <div>
        <Link
          to="/profile"
        >
          <img
            className="icons-header"
            src={ iconePerfil }
            alt="icone-perfil"
            data-testid="profile-top-btn"
          />
        </Link>
        <h1
          data-testid="page-title"
        >
          { UpperCaseTitle }
        </h1>
        {
          searchButton && (
            <a
              href="/#"
              onClick={ toggleSearchBar }
            >
              <img
                src={ iconeSearch }
                alt="icone-pesquisa"
                className="icons-header"
                data-testid="search-top-btn"
              />
            </a>

          )
        }
      </div>
      {
        renderSearch && <SearchBar title={ title } />
      }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchButton: PropTypes.bool.isRequired,
};

export default Header;

// tem que fazer o titulo dinamico para cada tela
// tem que fazer  as rotas dinamicas
