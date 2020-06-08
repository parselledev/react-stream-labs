import * as types from './products.types';

const productsFetchRequest = () => ({
  type: types.PRODUCTS_FETCH_REQUEST
});

const productsFetchSuccess = () => ({
  type: types.PRODUCTS_FETCH_SUCCESS,
});

const productsFetchFailure = err => ({
  type: types.PRODUCTS_FETCH_FAILURE,
  payload: err
});

export const productsGet = (dispatch, apiService) => () => {
  dispatch(productsFetchRequest());
  apiService.getProducts()
    .then(data => {
      dispatch(productsFetchSuccess())
      dispatch({
        type: types.PRODUCTS_GET,
        payload: data
      })
    })
    .catch(err => dispatch(productsFetchFailure(err)));
}