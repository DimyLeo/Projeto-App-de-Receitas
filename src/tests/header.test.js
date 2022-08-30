import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { meals } from "../../cypress/mocks/meals";
import Header from "../components/Header";
import renderWithRouter from "./renderWithRouter";

beforeEach(() => {
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

  const { history } = renderWithRouter(<Header title="foods" searchButton />);
})

describe('Teste de Cobertura Rota Foods', () => {
  test('Renderiza componente Foods', () => {    
    const profileLink = screen.getByTestId('profile-top-btn');
    const searchLink = screen.getByTestId('search-top-btn');

    userEvent.click(searchLink);
    userEvent.click(profileLink);

  })
})