const { default: axiosClient } = require("./axiosClint");

const addTocart = (payload)=>axiosClient.post('/carts', payload)
const getUserCartItems = (email)=>axiosClient.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)


export default {
    addTocart,
    getUserCartItems,

}