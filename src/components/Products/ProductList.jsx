import React from 'react'
import PropTypes from 'prop-types'
import ProductListItem from './ProductListItem'

/**
 * Renders a list of products.
 */
const ProductList = ({ products, onAddToCartRequest = () => {} }) => (
  <div className="product-list">
    <h5 className="title is-5">Products list:</h5>
    {products.length > 0 &&
      products.map(product => (
        <React.Fragment key={product.id}>
          <ProductListItem
            product={product}
            onAddToCartRequest={onAddToCartRequest}
          />
          <hr />
        </React.Fragment>
      ))}
    {products.length === 0 && <em>No products available !</em>}
  </div>
)

ProductList.propTypes = {
  /**
   * The available product list
   */
  products: PropTypes.arrayOf(PropTypes.object),
  /**
   * The callback called when a product is added to the cart
   *
   * @param {object} the product with the desired quantity
   */
  onAddToCartRequest: PropTypes.func
}

ProductList.defaultProps = {
  products: [],
  onAddToCartRequest: () => {}
}

export default ProductList
