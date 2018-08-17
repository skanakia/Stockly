const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const path = require("path")
const morgan = require("morgan")
const app = express();
const routes = require("./routes");
// const db = require("./models");


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
const userRoutes = require("./routes/api/user-api-routes.js")(app);

app.use(userRoutes);



mongoose.Promise = global.Promise
//mongoose boilerplate
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/Stockly"
);


const PORT = process.env.PORT || 8080;
app.listen(PORT);
