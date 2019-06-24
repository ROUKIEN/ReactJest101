import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ProductListApp from './ProductListApp'
import ProductList from './ProductList'
import Cart from '../Cart/Cart'
import productsApi from '../../api/productsApi'

jest.mock('../../api/productsApi')

Enzyme.configure({ adapter: new Adapter() })

const productsList = [
  { id: 1, name: 'Foo', price: 12.99, stock: 112 },
  { id: 4, name: 'Bar', price: 18.99, stock: 42 }
]

describe('ProductListApp', () => {
  describe('template', () => {
    it('should render a product list and a cart preview', () => {
      const appWrapper = shallow(<ProductListApp />, {disableLifecycleMethods: true})
      const productListWrapper = appWrapper.find(ProductList)
      const cartWrapper = appWrapper.find(Cart)

      expect(productListWrapper.exists()).toBe(true)
      expect(cartWrapper.exists()).toBe(true)
    })
  })
  describe('events', () => {
    describe('component mounting', () => {
      it('should fetch a products list on a remote url', done => {
        productsApi.getProducts.mockResolvedValue({
          data: [ {id: 1, name: 'Foo', price: 12.99, stock: 43} ]
        })

        const appWrapper = shallow(<ProductListApp />)

        /*
          Tricky part here:
          We are testing an asynchronous behavior.
         */
        setImmediate(() => {
          expect(productsApi.getProducts).toHaveBeenCalledTimes(1)
          expect(appWrapper.state('products').length).toEqual(1)
          done()
        })
      })
      it('should render an alert when fetching products failed', done => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {})
        productsApi.getProducts.mockRejectedValue({message: 'API is down :('})
        const wrapper = shallow(<ProductListApp />)

        setImmediate(() => {
          expect(alertSpy).toHaveBeenCalledTimes(1)
          expect(alertSpy).toHaveBeenCalledWith('API is down :(')
          done()
        })
      })
    })
    describe('addToCart', () => {
      it('should add a product to the state', () => {
        const appWrapper = shallow(<ProductListApp />, {disableLifecycleMethods: true})
        appWrapper.setState({
          products: [ {id: 1, name: 'Foo', price: 2.99, stock: 40} ]
        })
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
        const appWrapper = shallow(<ProductListApp />, {disableLifecycleMethods: true})
        appWrapper.setState({
          products: [ {id: 1, name: 'Foo', price: 12.99, stock: 40} ],
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
