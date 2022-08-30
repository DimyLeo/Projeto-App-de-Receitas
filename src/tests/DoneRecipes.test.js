import React from "react";
import { getByTestId, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import DoneRecipes from "../pages/DoneRecipes";
import renderWithRouter from "./renderWithRouter";
import userEvent from "@testing-library/user-event";
Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: () => {},
  },
});
describe('Teste de Cobertura Componente DoneRecipes', () => {
  test('Renderiza a Tela de favoritos vazia', () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        type,
        items,
        setItems,
        setType,
        categories,
      })
    );
    renderWithRouter(<DoneRecipes />);
  });
  test('Renderiza os cards dos DonesRecipes', async () => {
    jest.spyOn(React, 'useContext').mockImplementation(() => (
      {
        type,
        items,
        setItems,
        setType,
        categories,
      })
    );
    jest.spyOn(global, 'alert').mockImplementation(() => {});
    localStorage.setItem('doneRecipes', JSON.stringify([{
      alcoholicOrNot: "",
      category: "Side",
      id: "52977",
      image: "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      name: "Corba",
      nationality: "Turkish",
      type: "food",
      tags: ["UnHealthy", "Speciality", "HangoverFood"],
    },{
      alcoholicOrNot: "Optional alcohol",
      category: "Ordinary Drink",
      id: "15997",
      image: "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
      name: "GG",
      nationality: "",
      type: "drink",
    }
  ]))
  const { history } = renderWithRouter(<DoneRecipes />);
    const drinkFilter = screen.getByTestId("filter-by-drink-btn");
    const foodFilter = screen.getByTestId("filter-by-food-btn");
    const allFilter = screen.getByTestId("filter-by-all-btn");
    const tag = screen.getAllByTestId(`0-UnHealthy-horizontal-tag`)
    userEvent.click(drinkFilter);
    userEvent.click(foodFilter);
    userEvent.click(allFilter);
    expect(tag).toBeDefined();
    // const firstFavoriteImg = screen.getByTestId("0-horizontal-image");
    // const firstFavoriteName = screen.getByTestId("0-horizontal-name");
    const firstFavoriteShare = screen.getByTestId("0-horizontal-share-btn");
    userEvent.click(firstFavoriteShare);
    // await waitFor(() => screen.getByTestId('isCopied').not.toBeDefined())
  });
})