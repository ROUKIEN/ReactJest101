import React from 'react'
import ReactDOM from 'react-dom'
import ProductListApp from './components/Products/ProductListApp'

import { products } from '../products.json'

import 'bulma/css/bulma.min.css'

function App() {
  return (
    <section className="section">
      <div className="container">
        <ProductListApp products={products} />
      </div>
    </section>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
