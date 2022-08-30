import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Background from '../images/Background (7).png';
import useRecipe from '../utils/useRecipe';
import Carrosel from './Carrosel';
import IngredientsCheckbox from './IngredientsCheckBox';
import IngredientsList from './IngredientsList';
import Loading from './Loading';
import ProgressButton from './ProgressButton';
import RecipeButtons from './RecipeButtons';
import './RecipeDetails.css';
import RecipeVideo from './RecipeVideo';

const RecipeDetails = () => {
  const { location: { pathname } } = useHistory();
  const type = pathname.includes('foods') ? 'Meal' : 'Drink';
  const isInProgress = pathname.includes('in-progress');
  const { id } = useParams();
  const [recipe] = useRecipe(pathname, id, type);
  // console.log(recipe);

  if (!recipe) return <Loading />;
  const favoriteRecipe = {
    id,
    type: type === 'Meal' ? 'food' : 'drink',
    nationality: recipe.nationality ? recipe.nationality : '',
    category: recipe.category,
    alcoholicOrNot: recipe.alcoholic ? recipe.alcoholic : '',
    name: recipe.name,
    image: recipe.thumb,
    // tags: recipe.tags,
  };

  const doneRecipe = {
    ...favoriteRecipe,
    tags: recipe.tags?.split(',') || [],
    doneDate: new Date()
      .toLocaleDateString('pt-br', { format: 'dd/mm/yyyy' }),
  };

  return (
    <div className="RecipeDetails">
      <header className="recipe-header">
        {' '}

        <div className="thumbnail flex-item">

          <img
            src={ recipe.thumb }
            alt="recipe sprite"
            data-testid="recipe-photo"
            className="up-card-img"
          />
          {' '}
          <img
            src={ recipe.thumb }
            alt="recipe sprite"
            data-testid="recipe-photo"
            className="background-card-img"
          />
          <img
            src={ Background }
            alt="imagem de fundo"
            className="backrecipeimg"
          />
          <p
            data-testid="recipe-title"
          >
            { recipe.name }
          </p>
        </div>
        <div className="recipe-info flex-item">
          <RecipeButtons
            className="tag"
            favoriteRecipe={ favoriteRecipe }
          />
          <p className="tag">
            Tags
          </p>
          <p
            data-testid="recipe-category"
          >
            {type === 'Meal' ? recipe.category : recipe.alcoholic}
          </p>
        </div>
      </header>
      <div className="ingredients">
        <h3>Ingredients</h3>
        {
          isInProgress
            ? (
              <IngredientsCheckbox
                ingredients={ {
                  ingredients: recipe.ingredients,
                  measures: recipe.measures,
                } }
              />
            )
            : (
              <IngredientsList
                ingredients={ {
                  ingredients: recipe.ingredients,
                  measures: recipe.measures,
                } }
              />
            )
        }
      </div>
      <h3 className="instruction-title">Instructions</h3>
      <div className="instructions">
        <img src="https://images2.imgbox.com/00/a9/Olzxv9Iy_o.jpg" alt="line" />
        <p data-testid="instructions">{recipe.instrucions}</p>
      </div>
      {
        type === 'Meal' && (
          <RecipeVideo
            src={ recipe.video }
            name={ recipe.name }
          />
        )
      }
      <div className="recommended">
        <h3>Recommended</h3>
        <Carrosel recommendations={ recipe.recommendations } type={ type } />
      </div>
      <ProgressButton id={ id } doneRecipe={ doneRecipe } />
      <div className="ponta">.</div>
    </div>
  );
};

export default RecipeDetails;
