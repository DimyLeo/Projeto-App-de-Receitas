import { useEffect, useState } from 'react';
import { getFromLocalStorage, setToLocalStorage } from './getSetLocalStorage';

const useFavoriteRecipe = (key, recipe) => {
  const [favRecipe, setFavRecipe] = useState(() => {
    const itemsStorage = getFromLocalStorage(key);
    return itemsStorage?.some(({ id }) => id === recipe.id);
    // if (itemsStorage) {
    //   const isFavorite = itemsStorage.some(({ id }) => id === recipeId);
    //   return isFavorite;
    // }
    // return false;
  });

  useEffect(() => {
    setToLocalStorage(key, recipe);
  }, [favRecipe, key, recipe]);

  return [favRecipe, setFavRecipe];
};

export default useFavoriteRecipe;
