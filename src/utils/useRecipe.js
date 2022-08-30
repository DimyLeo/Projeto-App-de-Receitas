import { useEffect, useState } from 'react';
import fetchDispatch from './APIsFetch';

const numOfRecommendations = 6;

const getRecommendations = async (type) => {
  const title = type === 'Meal' ? 'drinks' : 'foods';
  const recipeKey = type === 'Meal' ? 'drinks' : 'meals';
  const recommendations = await fetchDispatch('', 'name', title);
  return recommendations[recipeKey].filter((_, index) => index < numOfRecommendations);
};

const getValues = (recipeObj, objKey) => Object.entries(recipeObj)
  .filter(([key, value]) => key.includes(objKey) && value)
  .map(([, value]) => value);

const mapRecipe = (recipeObj, type) => ({
  name: recipeObj[`str${type}`],
  category: recipeObj.strCategory,
  thumb: recipeObj[`str${type}Thumb`],
  tags: recipeObj.strTags,
  alcoholic: recipeObj?.strAlcoholic,
  instrucions: recipeObj.strInstructions,
  ingredients: getValues(recipeObj, 'Ingredient'),
  measures: getValues(recipeObj, 'Measure'),
  video: recipeObj?.strYoutube?.split('=')[1],
  nationality: recipeObj?.strArea,
});

const useRecipe = (pathname, id, type) => {
  const title = pathname.includes('foods') ? 'foods' : 'drinks';
  const recipeKey = pathname.includes('foods') ? 'meals' : 'drinks';

  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const getRecipe = async () => {
      const response = await fetchDispatch(id, 'details', title);
      const mappedRecipe = mapRecipe(response[recipeKey][0], type);
      const recommendations = await getRecommendations(type);
      setRecipe({
        ...mappedRecipe,
        recommendations,
      });
    };
    getRecipe();
  }, [id, title, recipeKey, type]);

  return [recipe, setRecipe];
};

export default useRecipe;
