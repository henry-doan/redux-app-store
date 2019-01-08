import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer/index';

const enhancers = compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

const store = createStore(rootReducer, {}, enhancers);

if(module.hot) {
  module.hot.accept('./reducer', () => {
    const nextRootReducer = require('./reducer/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store;