import React from "react";
import drinks from "../../cypress/mocks/drinks";
import meals from "../../cypress/mocks/meals";
import oneMeal from "../../cypress/mocks/oneMeal";
import RecipeDetails from "../components/RecipeDetails";
import renderWithRouter from "./renderWithRouter";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import oneDrink from "../../cypress/mocks/oneDrink";
import Drinks from "../pages/Drinks";
import RecipeInProgress from "../pages/RecipeInProgress";

describe('Teste de Cobertura Componente Recipes', () => {

  test('Renderiza componente Recipes via Drinks', async () => {
    const setItems = jest.fn().mockReturnValue(drinks);
    const setType = jest.fn().mockReturnValue('');
    const setisFinishButtonDisabled = jest.fn().mockReturnValue(false);
    const items = [];
    const type = '';
    const isFinishButtonDisabled = true;
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
        type,
        items,
        setItems,
        setType,
        categories,
        isFinishButtonDisabled,
        setisFinishButtonDisabled
      })
    );

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(drinks),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<RecipeDetails />, '/foods/52771', { id: '52771'});
    await waitFor(() => expect(fetch).toBeCalledTimes(1));
    expect(screen.getByTestId('recipe-photo')).toBeDefined();
    const startBtn = screen.getByRole('button', {
      name: /start recipe/i
    });
    userEvent.click(startBtn);
  });

  test('Renderiza componente Recipes via Drinks', async () => {
    const setItems = jest.fn().mockReturnValue(drinks);
    const setType = jest.fn().mockReturnValue('');
    const setisFinishButtonDisabled = jest.fn().mockReturnValue(false);
    const items = [];
    const type = '';
    const isFinishButtonDisabled = true;
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
        type,
        items,
        setItems,
        setType,
        categories,
        isFinishButtonDisabled,
        setisFinishButtonDisabled
      })
    );

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<RecipeDetails />, '/drinks/178319', { id: '178319'});
    await waitFor(() => expect(fetch).toBeCalledTimes(1));
    expect(screen.getByTestId('recipe-photo')).toBeDefined();
    const startBtn = screen.getByRole('button', {
      name: /start recipe/i
    });
    userEvent.click(startBtn);
  });
  test('Renderiza componente Recipes via Drinks in Progress', async () => {
    const setItems = jest.fn().mockReturnValue(drinks);
    const setType = jest.fn().mockReturnValue('');
    const setisFinishButtonDisabled = jest.fn().mockReturnValue(false);
    const items = [];
    const type = '';
    const isFinishButtonDisabled = true;
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
        type,
        items,
        setItems,
        setType,
        categories,
        isFinishButtonDisabled,
        setisFinishButtonDisabled
      })
    );

    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn()
        .mockResolvedValueOnce(oneDrink)
        .mockResolvedValueOnce(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<RecipeInProgress />, '/drinks/178319/in-progress', { id: '178319'});
    await waitFor(() => expect(fetch).toBeCalledTimes(1));
    expect(screen.getByTestId('recipe-photo')).toBeDefined();
    const startBtn = screen.getByRole('button', {
      name: /finish recipe/i
    });
    userEvent.click(startBtn);
  });

})