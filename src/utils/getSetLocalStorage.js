export const getFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key));

export const setToLocalStorage = (key, value) => {
  const itemsStorage = getFromLocalStorage(key);
  if (itemsStorage && (key === 'favoriteRecipes' || key === 'doneRecipes')) {
    const isFavorite = itemsStorage.some(({ id }) => id === value.id);
    if (isFavorite) {
      localStorage.setItem(key, JSON.stringify(
        itemsStorage.filter(({ id }) => id !== value.id),
      ));

      // if (getFromLocalStorage(key).length === 0) {
      //   localStorage.removeItem(key);
      // }
      return undefined;
    }

    return localStorage.setItem(key, JSON.stringify([
      ...itemsStorage,
      value,
    ]));
  }

  if (key === 'favoriteRecipes' || key === 'doneRecipes') {
    return localStorage.setItem(key, JSON.stringify([value]));
  }

  localStorage.setItem(key, JSON.stringify(value));
};
