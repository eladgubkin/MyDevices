import React from 'react';
import ReactDOM from 'react-dom';
import indexRoutes from './routes/index.jsx';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './assets/scss/style.css';
import './assets/custom.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} key={key} component={prop.component} />;
        })}
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
