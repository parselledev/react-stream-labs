import {createSelector} from 'reselect';

const selectProducts = state => state.products;

export const selectProductsData = createSelector(
  [selectProducts],
  products => products.data
);

export const selectProductsFetching = createSelector(
  [selectProducts],
  products => products.fetching
);

export const selectProductsErr = createSelector(
  [selectProducts],
  products => products.err
);