import React from 'react'
import ProductListItem from './ProductListItem'

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

export default ProductList
