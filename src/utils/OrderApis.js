const { default: axiosClient } = require("./axiosClint");


 
const createOrder = (data)=> axiosClient.post('/orders' ,data)



export default {
    createOrder,
    
}