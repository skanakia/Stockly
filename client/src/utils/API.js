import axios from "axios";

export default {
    saveCompany: function (symbol) {
        return axios.post("/api/stock/companyList", {symbol: symbol});
    },
    getCompanies: function(email) {
        return axios.get("/api/stock/companyList", {email: email});
    },
    deleteCompany: function(name) {
        return axios.delete("/api/stock/companyList", {symbol: name});
    },
    saveStockPrice: function(stockPrice) {
        return axios.post("/stock/price", stockPrice);
    },
    getStockPrices: function(email, symbol) {
        // console.log(axios.post("/api/audio/user/login", {"username": user.username, "password": user.password}, { crossDomain: true }));
        return axios.get("/stock/price", {email: email, symbol: symbol})
    },
    deleteStockPrices: function(email, symbol) {
        // console.log(axios.post("/api/audio/user/login", {"username": user.username, "password": user.password}, { crossDomain: true }));
        return axios.delete("/stock/price", {email: email, symbol: symbol})
    },
    createNewUser: function(userObj) {
        return axios.post("/api/user/signup", userObj);
    }

};