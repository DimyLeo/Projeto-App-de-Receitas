import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import buttonLogin from '../images/Login Button.svg';
import { setToLocalStorage } from '../utils/getSetLocalStorage';
import './Login.css';

function Login() {
  const history = useHistory();
  const [{ email, password }, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isDisabled = () => {
    const minLength = 7;
    const regex = new RegExp('[a-z0-9]+@[a-z]+\\.[a-z]{2,3}');
    return !regex.test(email) || password.length < minLength;
  };

  const handleLogin = () => {
    setToLocalStorage('user', {
      email,
    });
    setToLocalStorage('mealsToken', 1);
    setToLocalStorage('cocktailsToken', 1);
    setToLocalStorage('inProgressRecipes', {
      cocktails: {},
      meals: {},
    });
    history.push('/foods');
  };

  return (
    <div className="div-login">
      <img className="logo" src="https://images2.imgbox.com/25/51/MdP5r64J_o.png" alt="Logo" />
      <form>
        <label htmlFor="email">
          <input
            name="email"
            type="text"
            placeholder="Email"
            data-testid="email-input"
            value={ email }
            onChange={ handleChange }
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            type="password"
            placeholder="Password"
            data-testid="password-input"
            value={ password }
            onChange={ handleChange }
          />
        </label>
        <button
          className="img-button"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isDisabled() }
          onClick={ handleLogin }
        >
          <img src={ buttonLogin } alt="img-button" />
        </button>
      </form>
    </div>
  );
}

export default Login;
