import productsApi from './productsApi'
import axios from 'axios'

jest.mock('axios')

describe('productsApi', () => {
  describe('getProducts', () => {
    it('should return a promise', () => {
      axios.get.mockResolvedValue({ data: [] })
      const getProductsPromise = productsApi.getProducts()
      expect(axios.get).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledWith('https://my-json-server.typicode.com/ROUKIEN/products-mock-server/products')

      return expect(getProductsPromise).resolves.toEqual({data: []})
    })
  })
})
