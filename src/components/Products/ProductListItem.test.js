import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ProductListItem from './ProductListItem'
import AddToCart from './../Cart/AddToCart'

Enzyme.configure({ adapter: new Adapter() })

const product = { id: 1, name: 'Foo', price: 12.99, stock: 112 }

describe('ProductListItem', () => {
  describe('template', () => {
    it('should render the product details', () => {
      const productListItemWrapper = shallow(
        <ProductListItem product={product} />
      )
      expect(productListItemWrapper.find(AddToCart).exists()).toBe(true)
      expect(
        productListItemWrapper.find('.card-header-title').text()
      ).toContain('Foo')
      expect(
        productListItemWrapper.find('.card-header-title').text()
      ).toContain('12.99 €')
      expect(productListItemWrapper.find('span.tag-stock').text()).toEqual(
        '112'
      )
    })
  })
  describe('events', () => {
    it('should call the onAddToCartRequest property when the AddToCart component is used', () => {
      const mock = jest.fn()
      const productListItemWrapper = shallow(
        <ProductListItem product={product} onAddToCartRequest={mock} />
      )

      productListItemWrapper
        .find(AddToCart)
        .simulate('addToCartRequest', { quantity: 5 })
      expect(mock).toHaveBeenCalledTimes(1)
      expect(mock).toHaveBeenCalledWith({ id: 1, quantity: 5 })
    })
  })
})
