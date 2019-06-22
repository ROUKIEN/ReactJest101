import React from 'react'
import ProductList from './ProductList'
import Cart from './../Cart/Cart'

/**
 * Allows the user to add products to its cart among a products list.
 */
class ProductListApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cartProducts: []
    }

    this.addToCart = this.addToCart.bind(this)
  }

  addToCart({ id, quantity }) {
    const product = this.props.products.find(product => product.id === id)
    product.quantity = quantity
    const { cartProducts } = this.state
    const productExistsInCartIndex = cartProducts.findIndex(
      productInCart => productInCart.id === id
    )

    if (0 <= productExistsInCartIndex) {
      cartProducts[productExistsInCartIndex] = product
    } else {
      cartProducts.push(product)
    }

    this.setState({ cartProducts })
  }

  render() {
    const { products } = this.props
    const { cartProducts } = this.state

    return (
      <div className="columns">
        <div className="column is-two-thirds">
          <ProductList
            products={products}
            onAddToCartRequest={this.addToCart}
          />
        </div>
        <div className="column">
          <Cart products={cartProducts} />
        </div>
      </div>
    )
  }
}

export default ProductListApp
