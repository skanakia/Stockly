const db = require("../../models");
const router = require("express").Router();

router
    .route("/stock/companyList")
    .get(stockController.getCompanyNames)
    .post(stockController.saveCompanyName)
    .delete(stockController.deleteCompanyName)

router
    .route("/stock/price")
    .get(stockController.getAllPricesBySymbol)
    .post(stockController.savePrice)
    .delete(stockController.destroyAllPricesBySymbol)

module.exports = router;