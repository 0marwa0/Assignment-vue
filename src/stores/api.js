import axios from 'axios'
const URL = 'https://fakestoreapi.com'
// add a product to the product list
export const addProduct = (data) => {
  axios
    .post(`${URL}/products`, data)
    .then((response) => {
      //  console.log(response.json())
    })
    .catch((error) => {
      console.log(error)
    })
  // update localstorage
  let updatedStore = JSON.parse(localStorage.getItem('items'))
  updatedStore.unshift(data)
  console.log(data, 'in the api adding', updatedStore)
  localStorage.setItem('items', JSON.stringify(updatedStore))
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
      // console.log(response.data, 'delete it ')
    })
    .catch((error) => {
      console.log(error)
    })

  // update localstorage
  let updatedStore = JSON.parse(localStorage.getItem('items'))
  updatedStore = updatedStore?.filter((item) => item.id !== id)
  localStorage.setItem('items', JSON.stringify(updatedStore))
  window.location.reload()
  return updatedStore
}

// updateProduct

export const updateAPI = (id, data) => {
  axios
    .put(`${URL}/products/${id}`, data)
    .then((response) => {})
    .catch((error) => {
      console.log(error)
    })
  // update localstorage

  let updatedStore = JSON.parse(localStorage.getItem('items'))
  updatedStore = updatedStore.map((obj) => {
    if (obj.id === id) {
      return { ...obj, ...data }
    }
    return obj
  })

  localStorage.setItem('items', JSON.stringify(updatedStore))
}
