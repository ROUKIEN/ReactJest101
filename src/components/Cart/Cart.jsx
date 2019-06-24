import React from 'react'
import PropTypes from 'prop-types'

/**
 * Renders the user cart content.
 */
const Cart = ({ products }) => (
  <div className="cart">
    <h5 className="title is-5">Cart content</h5>
    <ul>
      {products.length > 0 &&
        products.map(product => (
          <li key={product.id}>
            {`${product.quantity} ${product.name} (${product.price}): ${(
              product.quantity * product.price
            ).toFixed(2)}`}{' '}
            €
          </li>
        ))}
      {products.length === 0 && <li>No products in your cart !</li>}
    </ul>
    <div className="cart-total">
      Total:
      {products
        .map(product => product.price * product.quantity)
        .reduce((total, curr) => total + curr, 0)
        .toFixed(2)}
      €
    </div>
  </div>
)

Cart.propTypes = {
  /**
   * The cart products
   */
  products: PropTypes.arrayOf(PropTypes.object)
}

export default Cart
