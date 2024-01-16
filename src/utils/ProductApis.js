const { default: axiosClient } = require("./axiosClint");

const getLatestProducts = ()=>axiosClient.get('/Products?populate=*')

export default {
    getLatestProducts
}