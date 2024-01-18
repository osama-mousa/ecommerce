const { default: axiosClient } = require("./axiosClint");

const addTocart = (payload)=>axiosClient.post('/carts', payload)
const getUserCartItems = (email)=>axiosClient.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
const deleteCartItem = (id)=>axiosClient.delete(`/carts/${id}`)

export default {
    addTocart,
    getUserCartItems,
    deleteCartItem,

}