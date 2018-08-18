const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const path = require("path")
const morgan = require("morgan")
const app = express();
const routes = require("./routes");
// const db = require("./models");
const cors = require('cors');


app.use(cors());

//express.use boilerplate
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.use(routes);

//require the routes
require("./config/passport.js")(app);
require("./routes/api/user-api-routes.js")(app);


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});



mongoose.Promise = global.Promise
//mongoose boilerplate
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Stockly"
);


const PORT = process.env.PORT || 3001;
app.listen(PORT);
