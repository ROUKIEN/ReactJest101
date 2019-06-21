import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Cart from './Cart'

Enzyme.configure({ adapter: new Adapter() })

const productsList = [
  { id: 1, name: 'Foo', price: 12.99, quantity: 2 },
  { id: 4, name: 'Bar', price: 18.99, quantity: 1 }
]

describe('Cart', () => {
  describe('template', () => {
    it('should list the cart products', () => {
      const cartWrapper = shallow(<Cart products={productsList} />)
      const liWrapper = cartWrapper.find('li')
      expect(liWrapper.length).toEqual(2)

      expect(liWrapper.first().text()).toEqual('2 Foo (12.99): 25.98 €')
      expect(liWrapper.last().text()).toEqual('1 Bar (18.99): 18.99 €')
    })
    it('should render a message when no products are in the cart', () => {
      const cartWrapper = shallow(<Cart products={[]} />)
      expect(cartWrapper.find('li').length).toEqual(1)
      expect(
        cartWrapper
          .find('li')
          .first()
          .text()
      ).toEqual('No products in your cart !')
    })
    it('should render the total of the cart', () => {
      const cartWrapper = shallow(<Cart products={productsList} />)
      const totalWrapper = cartWrapper.find('.cart-total')
      expect(totalWrapper.length).toEqual(1)
      expect(totalWrapper.text()).toEqual('Total:44.97€')
    })
  })
})
