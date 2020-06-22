import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.sass';
import Header from 'Components/Header/Header';
import ProductsPage from 'Pages/ProductsPage/ProductsPage';

const App = () => {
  return(
    <div className="app">
      <div className="wrap">
        <Header />
        <Switch>
          <Route path="/" component={ProductsPage} exact/>
          <Route path="/index.html" component={ProductsPage} exact/>
          <Route render={()=><p>Старница не найдена</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;