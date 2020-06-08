import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
}

import productsReducer from './products/products.reducer';

const rootReducer = combineReducers({
  products: productsReducer,
});

export default persistReducer(persistConfig, rootReducer);