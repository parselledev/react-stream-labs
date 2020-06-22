import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import compose from 'Utils/compose';
import withApiService from 'Components/hoc/withApiService';
import {createStructuredSelector} from 'reselect';
import {selectProductsData} from 'Redux/products/products.selectors';
import {productsGet} from 'Redux/products/products.actions';
import ProductsCardList from 'Components/Products/ProductsCardList/ProductsCardList';

import './ProductsPage.sass';

class ProductsPageContainer extends Component {

  componentDidMount() {
    this.props.productsGet();
  }

  render() {
    return(
      <div className="products">
        <ProductsCardList />
      </div>
    );
  }
}

ProductsPageContainer.propTypes = {
  products: PropTypes.object,
  productsGet: PropTypes.func.isRequired
}

const mapStateToProps = createStructuredSelector({
  products: selectProductsData
});

const mapDispatchToProps = (dispatch, {apiService}) => ({
  productsGet: productsGet(dispatch, apiService)
})

export default compose(
  withApiService(),
  connect(mapStateToProps, mapDispatchToProps)
)(ProductsPageContainer);