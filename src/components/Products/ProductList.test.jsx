import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ProductList from './ProductList'
import ProductListItem from './ProductListItem'

Enzyme.configure({ adapter: new Adapter() })

const productsList = [
  { id: 1, name: 'Foo', price: 12.99, stock: 112 },
  { id: 4, name: 'Bar', price: 18.99, stock: 42 }
]

describe('Cart', () => {
  describe('template', () => {
    it('should list the cart products', () => {
      const productListWrapper = shallow(
        <ProductList products={productsList} />
      )
      const itemWrapper = productListWrapper.find(ProductListItem)
      expect(itemWrapper.length).toEqual(2)

      expect(itemWrapper.first().props()).toHaveProperty('product')
      expect(itemWrapper.last().props()).toHaveProperty('product')
    })
    it('should render a message when no products are available', () => {
      const productListWrapper = shallow(<ProductList products={[]} />)
      expect(productListWrapper.find(ProductListItem).length).toEqual(0)
      expect(productListWrapper.find('em').text()).toEqual(
        'No products available !'
      )
    })
  })
})
