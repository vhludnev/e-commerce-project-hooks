// Neither Local nor Sesson Storage integrated: //
// import { combineReducers } from 'redux';

// import userReducer from './user/user.reducer';
// import cartReducer from './cart/cart.reducer';

// export default combineReducers({ 
// 	user: userReducer, 
// 	cart: cartReducer 
// });


// LocalStorage implementation: //
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // makes localStorage become default storage

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = { key: 'root', storage, whitelist: ['cart'] };

const rootReducer = combineReducers({
	user: userReducer,
	cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);

// SessionStorage implementation: //
// import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // makes localStorage become default storage
// import storageSession from 'redux-persist/lib/storage/session' // the same as above but for Session storage

// import userReducer from './user/user.reducer';
// import cartReducer from './cart/cart.reducer';

// const persistConfig = { key: 'root', storage, whitelist: ['cart'] };
// const cartPersistConfig = { key: 'root', storage:storageSession };

// const rootReducer = combineReducers({
// 	user: userReducer,
// 	//cart: cartReducer
// 	cart: persistReducer(cartPersistConfig, cartReducer)
// });

// export default persistReducer(persistConfig, rootReducer);