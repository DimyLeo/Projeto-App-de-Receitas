import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { meals } from "../../cypress/mocks/meals";
import Footer from "../components/Footer";
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

  renderWithRouter(<Footer />);
})

describe('Teste de Cobertura Footer', () => {
  test('Renderiza componente Footer', () => {    
    const drink = screen.getByTestId('drinks-bottom-btn');
    const food = screen.getByTestId('food-bottom-btn');

    userEvent.click(food);
    userEvent.click(drink);
    userEvent.click(drink);
  })
})