import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Recipes from '../components/Recipes';
import AppContext from '../context';
import Receitapp from '../images/ReceitappTittle.svg';
import './Foods.css';

function Drinks() {
  const { type, setType, items } = React.useContext(AppContext);

  const isDrink = !!(items[0]?.idDrink);
  useEffect(() => {
    setType('Drink');
  }, [setType]);

  if (!isDrink || type !== 'Drink') return <Loading />;
  return (
    <div className="div-foods">
      <Header title="drinks" searchButton />
      <Recipes />
      <Footer />
      <div className="receitapp">
        <img src={ Receitapp } alt="Receitapp" />
      </div>
    </div>
  );
}

export default Drinks;
