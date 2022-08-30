import { act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { meals } from "../../cypress/mocks/meals";
import oneDrink from "../../cypress/mocks/oneDrink";
import SearchBar from "../components/SearchBar";
import renderWithRouter from "./renderWithRouter";

beforeEach(() => {
  jest.clearAllMocks();
})

describe('Teste de Cobertura Componente SearchBar', () => {
  test('Testa busca por Ingrediente', () => {
    const setItems = jest.fn().mockReturnValue(meals);
    const items = [];
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        items,
        setItems,
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar title="foods" />);
    const searchButton = screen.getByTestId('exec-search-btn');
    userEvent.click(searchButton);    
    const searchInput = screen.getByTestId('search-input');
    const ingredientOption = screen.getByTestId('ingredient-search-radio');

    userEvent.type(searchInput, 'chicken');
    userEvent.click(ingredientOption);
    userEvent.click(searchButton);
  });

  test('Testa busca por Primeira letra', () => {
    const setItems = jest.fn().mockReturnValue(meals);
    const items = [];
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        items,
        setItems,
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(meals),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar title="foods" />);
    const firstLetterOption = screen.getByTestId('first-letter-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'ch');
    userEvent.click(firstLetterOption);
    userEvent.click(searchButton);

  });

  test('Testa busca retornando um elemento', () => {
    const setItems = jest.fn().mockReturnValue(oneDrink);
    const items = [];
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        items,
        setItems,
      })
    );
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneDrink),
    });
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    renderWithRouter(<SearchBar title="drinks" />);
    const nameOption = screen.getByTestId('name-search-radio');
    const searchButton = screen.getByTestId('exec-search-btn');
    const searchInput = screen.getByTestId('search-input');
    userEvent.type(searchInput, 'ch');
    userEvent.click(nameOption);
    userEvent.click(searchButton);

  });
});