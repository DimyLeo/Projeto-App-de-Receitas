import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { meals } from "../../cypress/mocks/meals";
import App from "../App";
import renderWithRouter from "./renderWithRouter";

describe('Teste de Cobertura Rota de Login', () => {
  test('Renderiza componente Login', () => {
    const setItems = jest.fn().mockReturnValue(meals);
    const setType = jest.fn().mockReturnValue('Meal');
    const items = [];
    const categories = {
      meals: [
        { strCategory: 'Beef' },
        { strCategory: 'Breakfast' },
        { strCategory: 'Chicken' },
        { strCategory: 'Dessert' },
        { strCategory: 'Goat' },
      ],
      drinks: [
        { strCategory: 'Ordinary Drink' },
        { strCategory: 'Cocktail' },
        { strCategory: 'Shake' },
        { strCategory: 'Other/Unknown' },
        { strCategory: 'Cocoa' },
      ],
    }
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        items,
        setItems,
        setType,
        categories,
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');

    userEvent.click(loginBtn);

  })
})