import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore, compose } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './redux/reducers';
import Routes from './components/routes';

const store = createStore(
  rootReducer,

  compose(
    applyMiddleware(thunk),
    // Note: This should be configured to only run in a development environment
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
