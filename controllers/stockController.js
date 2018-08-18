const Stock = require("../models/Stock");
const Prices = require("../models/Prices");


// Defining methods for the stockController
module.exports = {
    getCompanyNames: function (req, res) {
        Stock
            .find({ project_id: req.params.id })
            .then(dbModel => res.send(dbModel))
            .catch(err => res.status(422).json(err));
    },
    saveCompanyName: function (req, res) {
        let savedCompName = {};
        savedCompName.user_email = req.body.email;
        savedCompName.company_name = req.body.symbol;
        console.log(savedCompName);
        Stock.create(savedCompName).then(function (doc) {
            console.log(doc);
            res.json(doc);
        }).catch(err => res.status(422).json(err));
    },
    deleteCompanyName: function (req, res) {
        Stock
            .find({ user_email: req.body.email, company_name: req.body.symbol })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    getAllPricesBySymbol: function (req, res) {
        Prices
            .find({user_email: req.params.email, company_name: req.params.symbol})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    savePrice: function(req, res) {

        let priceByDate = {};
        priceByDate.user_email = req.body.email;
        priceByDate.company_name = req.body.symbol;
        priceByDate.date = req.body.date;
        priceByDate.close = req.body.close;
        priceByDate.high = req.body.high;
        priceByDate.low = req.body.low;
        priceByDate.open = req.body.open;
        priceByDate.volume = req.body.volume;

        Prices
            .create(priceByDate)
            .then(function(doc){
                console.log(doc);
                res.json(doc);
            }).catch(err => res.status(422).json(err));
    },
    destroyAllPricesBySymbol: function(req, res) {
        Prices
            .find({user_email: req.params.email, company_name: req.params.symbol})
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};