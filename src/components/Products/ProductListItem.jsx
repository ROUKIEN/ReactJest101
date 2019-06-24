import React from 'react'
import PropTypes from 'prop-types'
import AddToCart from '../Cart/AddToCart'

/**
 * Renders a product list item
 */
const ProductListItem = ({ product, onAddToCartRequest }) => (
  <div className="card product-list-item">
    <header className="card-header">
      <p className="card-header-title">
        {product.name} - {product.price} €
      </p>
    </header>
    <div className="card-content">
      <div className="price-stock">
        <div className="field is-grouped">
          <div className="control">
            <div className="tags has-addons">
              <span className="tag is-dark is-small">stock</span>
              <span className="tag tag-stock is-info is-small">
                {product.stock}
              </span>
            </div>
          </div>
        </div>
      </div>
      <br />
      <AddToCart
        stock={product.stock}
        onAddToCartRequest={({ quantity }) =>
          onAddToCartRequest({ id: product.id, quantity })
        }
      />
    </div>
  </div>
)

ProductListItem.propTypes = {
  /**
   * The product to display
   */
  product: PropTypes.object.isRequired,
  /**
   * The callback called when the `AddToCart` component triggers an `onAddToCartRequest` event.
   *
   * @param {object} the product ID plus the desired quantity
   */
  onAddToCartRequest: PropTypes.func
}

ProductListItem.defaultProps = {
  onAddToCartRequest: () => {}
}

export default ProductListItem
