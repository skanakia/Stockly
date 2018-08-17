const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StockSchema = new Schema({
    user_email:{
        type: String,
        required: true,
    },

    company_name:{
        type: String,
        required: true
    }
});

const Stock= mongoose.model("Stock", StockSchema);
module.exports = Stock;
