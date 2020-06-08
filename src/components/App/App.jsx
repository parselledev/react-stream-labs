import React from 'react';
import {Route, Switch} from 'react-router-dom';
import './App.sass';
import ProductsPage from 'Pages/ProductsPage/ProductsPage';

const App = () => {
  return(
    <div className="app">
      <div className="wrap">
        <Switch>
          <Route path="/" component={ProductsPage} exact/>
          <Route render={()=><p>Старница не найдена</p>} />
        </Switch>
      </div>
    </div>
  );
}

export default App;