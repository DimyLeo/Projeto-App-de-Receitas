import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RecipeDetails from './components/RecipeDetails';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <Switch>
      <Route path="/foods/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/foods/:id" component={ RecipeDetails } />
      <Route path="/foods" component={ Foods } />
      <Route path="/drinks/:id/in-progress" component={ RecipeInProgress } />
      <Route path="/drinks/:id" component={ RecipeDetails } />
      <Route path="/drinks" component={ Drinks } />
      <Route path="/profile" component={ Profile } />
      <Route path="/done-recipes" component={ DoneRecipes } />
      <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      <Route exact path="/Projeto-App-de-Receitas" component={ Login } />
    </Switch>
  );
}

export default App;
