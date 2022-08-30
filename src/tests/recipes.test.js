import React from "react";
import { meals } from "../../cypress/mocks/meals";
import Drinks from "../pages/Drinks";
import Foods from "../pages/Foods";
import { drinks } from "./mocks/drinks";
import renderWithRouter from "./renderWithRouter";

describe('Teste de Cobertura Componente Recipes', () => {
  test('Renderiza componente Recipes via Drinks', () => {
    const setItems = jest.fn().mockReturnValue(drinks);
    const setType = jest.fn().mockReturnValue('Drink');
    const items = [...drinks];
    const type = 'Drink';
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
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Drinks />);

  });

  test('Renderiza componente Recipes via Foods', () => {
    const setItems = jest.fn().mockReturnValue(meals);
    const setType = jest.fn().mockReturnValue('Meal');
    const items = [...meals];
    const type = 'Meal';
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
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Foods />);

  });
  test('Renderiza componente Recipes via Drinks sem Valores', () => {
    const setItems = jest.fn().mockReturnValue(drinks);
    const setType = jest.fn().mockReturnValue('');
    const items = [...meals];
    const type = '';
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
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});

    renderWithRouter(<Drinks />);

  });
})