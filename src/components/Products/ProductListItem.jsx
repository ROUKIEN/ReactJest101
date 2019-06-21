import React from 'react'
import AddToCart from '../Cart/AddToCart'

const ProductListItem = ({ product, onAddToCartRequest = () => {} }) => (
  <div className="product-list-item">
    <h3 className="title is-6">
      {product.name} -{' '}
      <AddToCart
        stock={product.stock}
        onAddToCartRequest={({ quantity }) =>
          onAddToCartRequest({ id: product.id, quantity })
        }
      />
    </h3>
    <div className="price-stock">
      {product.price} € - {product.stock} in stock
    </div>
  </div>
)

export default ProductListItem
