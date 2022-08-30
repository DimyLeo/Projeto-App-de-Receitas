import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { meals } from "../../cypress/mocks/meals";
import Profile from "../pages/Profile";
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
  jest.spyOn(global, 'alert').mockImplementation(() => {});

  renderWithRouter(<Profile />);

})

describe('Teste de Cobertura Profile', () => {
  test('Renderiza componente Profile', () => {
    const profile = screen.getByTestId('profile-top-btn');
    userEvent.click(profile);

    const profileBtn = screen.getByTestId('profile-done-btn');
    const email = screen.getByTestId('profile-email');
    const favorite = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileBtn).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);
  })
})