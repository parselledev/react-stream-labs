import React from 'react';
import './ProductsCardList.sass';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import {
    selectProductsData,
    selectProductsFetching
} from 'Redux/products/products.selectors';
import ProductsCard from 'Components/Products/ProductsCard/ProductsCard';

const ProductsCardList = ({
  products,
  fetching
}) => {

  const processProducts = products => {
    let result = {};

    for(let key in products) {
      const product = products[key];

      if(product && !product.isDeleted) {
        result[key] = product;
      }
    }
    return result;
  }

  const visibleProducts = processProducts(products);

  return(
    Object.keys(visibleProducts).length != 0 ?
      <ul className="products__list">
        {
          Object.keys(visibleProducts).map(key => {
          return(
            visibleProducts[key].ParentID == null ?
              <ProductsCard
              key={key}
              id={visibleProducts[key].ProductID}
              fetching={fetching}
              product={visibleProducts[key]}
              products={visibleProducts}
            />
            :
            null
          );
          })
        }
      </ul>
  :
  <p>Попробуйте изменить категорию или фильтр</p>
  );
}

ProductsCardList.propTypes = {
  products: PropTypes.object,
  fetching: PropTypes.bool
}

const mapStateToProps = createStructuredSelector({
  products: selectProductsData,
  fetching: selectProductsFetching
});
  
export default compose(
  withApiService(),
  connect(mapStateToProps, null)
)(ProductsCardList);