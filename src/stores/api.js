import axios from 'axios'
const URL = 'https://fakestoreapi.com'
// add a product to the product list
export const addProduct = (data) => {
  axios
    .post(`${URL}/products`, data)
    .then((response) => {
      console.log(response.json())
    })
    .catch((error) => {
      console.log(error)
    })
}
// get all products
export const getProducts = (data) => {
  return axios
    .get(`${URL}/products`, data)
    .then((response) => {
      response.data
    })
    .catch((error) => {
      console.log(error)
    })
}
// delete product

export const deletProduct = (id) => {
  axios
    .delete(`${URL}/products/${id}`)
    .then((response) => {
      console.log(response.data, 'delete it ')
    })
    .catch((error) => {
      console.log(error)
    })
}
