const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PriceSchema = new Schema({
    user_email:{
        type: String,
        required: true,
    },

    company_name:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    open:{
        type: Number
    },

    high:{
        type: Number
    },
    low:{
        type: Number
    },
    close:{
        type: Number
    },
    volume:{
        type: Number
    }
});

const Prices = mongoose.model("Prices", PriceSchema);
module.exports = Prices;
