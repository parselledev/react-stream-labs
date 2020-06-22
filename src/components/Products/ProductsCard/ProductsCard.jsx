import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './ProductsCard.sass';

class ProductsCard extends Component {

  render() {
    const {product} = this.props;
    const {title, desc} = product;

    return(
      <div className="products__card">
        <div className="products__card-img"></div>
        <div className="products__card-content">
          <h6 className="products__card-title">{title}</h6>
          <p className="products__card-desc">{desc}</p>
        </div>
      </div>
    );
  };

}

ProductsCard.propTypes = {
  product: PropTypes.object,
}

export default ProductsCard;