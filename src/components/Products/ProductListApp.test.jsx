import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ProductListApp from './ProductListApp'
import ProductList from './ProductList'
import Cart from '../Cart/Cart'

Enzyme.configure({ adapter: new Adapter() })

const productsList = [
  { id: 1, name: 'Foo', price: 12.99, stock: 112 },
  { id: 4, name: 'Bar', price: 18.99, stock: 42 }
]

describe('ProductListApp', () => {
  describe('template', () => {
    it('should render a product list and a cart preview', () => {
      const appWrapper = shallow(<ProductListApp products={productsList} />)
      const productListWrapper = appWrapper.find(ProductList)
      const cartWrapper = appWrapper.find(Cart)

      expect(productListWrapper.exists()).toBe(true)
      expect(cartWrapper.exists()).toBe(true)
    })
  })
  describe('events', () => {
    describe('addToCart', () => {
      it('should add a product to the state', () => {
        const appWrapper = shallow(<ProductListApp products={productsList} />)
        appWrapper
          .find(ProductList)
          .simulate('addToCartRequest', { id: 1, quantity: 2 })
        expect(appWrapper.state('cartProducts').length).toEqual(1)
        expect(appWrapper.state('cartProducts')[0]).toHaveProperty(
          'quantity',
          2
        )
        expect(appWrapper.state('cartProducts')[0]).toHaveProperty(
          'name',
          'Foo'
        )
      })
      it('should replace an existing quantity if the product is already in the cart', () => {
        const appWrapper = shallow(<ProductListApp products={productsList} />)
        appWrapper.setState({
          cartProducts: [{ id: 1, name: 'Foo', quantity: 42, price: 12.99 }]
        })
        appWrapper
          .find(ProductList)
          .simulate('addToCartRequest', { id: 1, quantity: 12 })
        expect(appWrapper.state('cartProducts').length).toEqual(1)
        expect(appWrapper.state('cartProducts')[0]).toHaveProperty(
          'quantity',
          12
        )
      })
    })
  })
})
