import React from 'react'
import PropTypes from 'prop-types'

/**
 * Allows to add a product to the cart
 */
class AddToCart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1
    }

    this.handleQuantityUpdate = this.handleQuantityUpdate.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleQuantityUpdate(evt) {
    this.setState({ quantity: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.props.onAddToCartRequest({ quantity: this.state.quantity })
  }

  render() {
    const { stock } = this.props

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field has-addons">
          <div className="control">
            <div className="select is-small">
              <select name="quantity" onChange={this.handleQuantityUpdate}>
                {[...Array(stock).keys()].map(quantity => (
                  <option key={quantity + 1} value={quantity + 1}>
                    {quantity + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="control">
            <button className="button is-primary is-small" type="submit">
              Add to cart
            </button>
          </div>
        </div>
      </form>
    )
  }
}

AddToCart.propTypes = {
  /**
   * Called when the form is submitted
   *
   * @param {Object} addToCartRequest the add to cart request
   */
  onAddToCartRequest: PropTypes.func,
  /**
   * The max number of selectable items
   */
  stock: PropTypes.number
}

AddToCart.defaultProps = {
  onAddToCartRequest: () => {},
  stock: 0
}

export default AddToCart
