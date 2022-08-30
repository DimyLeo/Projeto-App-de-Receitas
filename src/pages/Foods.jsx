import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import AppContext from '../context';
import Receitapp from '../images/ReceitappTittle.svg';
import './Foods.css';

function Foods() {
  const { type, setType, items } = React.useContext(AppContext);

  const isMeal = !!(items[0]?.idMeal);
  useEffect(() => {
    setType('Meal');
  }, [setType]);

  if (!isMeal || type !== 'Meal') return <Loading />;
  return (
    <div className="div-foods">
      <Header title="foods" searchButton />
      <Recipes />
      <Footer />
      <div className="receitapp">
        <img src={ Receitapp } alt="Receitapp" />
      </div>
    </div>
  );
}

export default Foods;
