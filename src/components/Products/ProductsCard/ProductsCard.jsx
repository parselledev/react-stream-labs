import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './ProductsCard.sass';
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons';
import Button from 'Components/UI/Button/Button';

class ProductsCard extends Component {

  state = {
      expandVisible: false
  }

  handleExpandToggle = (e) => {
      e.preventDefault();
      const {expandVisible} = this.state;
      this.setState({expandVisible: !expandVisible})
  }

  processSubProducts = (id, products) => {
      const result = {};
      for(let key in products) {
          const product = products[key];
          if(product.ParentID == id) result[key] = product;
      }
      return result;
  }

  render() {
    const {expandVisible} = this.state;
    const {id, product, products} = this.props;
    const {Name:name, descriptionen:desc} = product;

    const subProducts = this.processSubProducts(id, products);

    const subProductsList =
      <Fragment>
        <Button
            className="products__card-expand"
            classMod="small--circle--blue--icon"
            icon={expandVisible ? faArrowUp : faArrowDown}
            onClick={this.handleExpandToggle}
        />
        {
          expandVisible ?
            <ul className="products__card-list">
              {
                Object.keys(subProducts).map(key => {
                  const product = products[key];
                  const {Name:name, descriptionen:desc, Type:type} = product;
                  return(
                    <li key={key} className="products__card-list-item">
                        <p className="products__card-sub-product-title">{name} <span className="">({type})</span></p>
                        <p className="products__card-sub-product-desc">{desc}</p>
                    </li>
                  )
                })
              }
            </ul>
          :
          null
        }
      </Fragment>

    return(
      <div className="products__card">
        <div className="products__card-img"></div>
        <div className="products__card-content">
          <h6 className="products__card-title">{name}</h6>
          <p className="products__card-desc">{desc}</p>
          {Object.keys(subProducts).length !== 0 ? subProductsList : null}
        </div>
      </div>
    );
  };

}

ProductsCard.propTypes = {
  id: PropTypes.string,
  fetching: PropTypes.bool,
  product: PropTypes.object,
  products: PropTypes.object
}

export default ProductsCard;