import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger'; // catches actions and console.logs them (good for debugging)
import { persistStore } from 'redux-persist'; // lets the browser cash the store

import rootReducer from './root-reducer';

const middlewares = [logger]; // an Array of "console.logs"

// const store = createStore(rootReducer, applyMiddleware(logger));  --> when there is only one middleware in project
export const store = createStore(rootReducer, applyMiddleware(...middlewares)); // "applyMiddleware(...middlewares)" spreads combined middleware into single logs

export const persistor = persistStore(store);

// export default { store, persistor }; // not necessary, since already exporting them above