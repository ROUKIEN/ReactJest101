import axios from 'axios'

/**
 * Retrieve a list of products
 *
 * @returns {Promise}
 */
const getProducts = () =>
  axios.get('https://my-json-server.typicode.com/ROUKIEN/products-mock-server/products') // best server ever

export default {
  getProducts
}
