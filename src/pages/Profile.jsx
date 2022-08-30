import md5 from 'md5';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Receitapp from '../images/ReceitappTittle.svg';
import { getFromLocalStorage } from '../utils/getSetLocalStorage';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const handleLogout = () => {
    localStorage.clear();
    history.push('/Projeto-App-de-Receitas');
  };

  const getGravatar = () => {
    const getEmail = getFromLocalStorage('user')?.email || 'teste@teste.com';
    const hashEmail = md5(getEmail).toString();
    return `https://www.gravatar.com/avatar/${hashEmail}?default=https://i.ibb.co/P6wGB6Y/Receitapp-Logo.png`;
  };

  return (
    <div>
      <Header title="Profile" searchButton={ false } />
      <div className="profile">
        <img src={ getGravatar() } alt="Logo" className="logo-profile" />
        <p
          data-testid="profile-email"
          className="email-profile"
        >
          {getFromLocalStorage('user')?.email}

        </p>
        <Link to="/done-recipes" className="profilecontent">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profilecontent"
          >
            Done Recipes
          </button>
        </Link>
        <Link to="/favorite-recipes" className="profilecontent">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profilecontent"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
          className="profilecontent"
        >
          Logout
        </button>
        <Footer />
        <div className="receitapp-profile">
          <img src={ Receitapp } alt="Receitapp" />
        </div>
      </div>

    </div>
  );
}

export default Profile;
