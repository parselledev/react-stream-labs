import {
  PRODUCTS_FETCH_REQUEST,
  PRODUCTS_FETCH_SUCCESS,
  PRODUCTS_FETCH_FAILURE,
  PRODUCTS_GET
} from './products.types';

const INITIAL_STATE = {
  data: {},
  fetching: false,
  err: null
};

const productsReducer = (state = INITIAL_STATE, action) => {
  switch(action.type) {

    case PRODUCTS_FETCH_REQUEST:
      return {
        ...state,
        fetching: true,
        err: null
      };

    case PRODUCTS_FETCH_SUCCESS:
      return {
        ...state,
        fetching: false,
        err: null
      };

    case PRODUCTS_FETCH_FAILURE:
      return {
        ...state,
        fetching: false,
        err: action.payload
      };

    case PRODUCTS_GET:
      return {
        ...state,
        data: {...action.payload}
      }

    default:
      return state;
  }
}

export default productsReducer;