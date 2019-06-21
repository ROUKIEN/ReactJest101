import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AddToCart from './AddToCart'

Enzyme.configure({ adapter: new Adapter() })

describe('AddToCart', () => {
  describe('selectable quantities', () => {
    it('should be able to select from 0 to stock+1 as quantity', () => {
      const addToCartWrapper = shallow(<AddToCart stock={12} />)
      expect(addToCartWrapper.find('option').length).toEqual(12)
      const options = addToCartWrapper.find('option')
      expect(options.first().props()).toHaveProperty('value', 1)
      expect(options.last().props()).toHaveProperty('value', 12)
    })
  })
  describe('events', () => {
    it('should emit an event containing the product quantity when the form is submitted', () => {
      const mock = jest.fn()
      const preventDefaultMock = jest.fn()
      const addToCartWrapper = shallow(
        <AddToCart stock={12} onAddToCartRequest={mock} />
      )

      addToCartWrapper
        .find('select')
        .simulate('change', { target: { value: 5 } })

      addToCartWrapper
        .find('form')
        .simulate('submit', { preventDefault: preventDefaultMock })

      expect(preventDefaultMock).toHaveBeenCalledTimes(1)
      expect(mock).toHaveBeenCalledTimes(1)
      expect(mock).toHaveBeenCalledWith({ quantity: 5 })
    })
  })
})
