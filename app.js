//Dependencies for the server
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const body_parser = require("body-parser");
const passport = require("passport");

const dbConfig = require("./config/database");

//Conects to the mongoDb database
mongoose.connect(dbConfig.database);

//Checks for database connection
mongoose.connection.on("connected", function () {
    console.log("The server has connected to the database");
})

//Checks for database connection error
mongoose.connection.on("error", function (err) {
    console.log("The server has failed to connect to the database: " + err);
})


//Creates application with framework(routing is main)
const app = express();

//Used for all /api requests
const api = require("./routes/api");

//Port for the server
const port = 80;



//Uses CORS middleware
app.use(cors());

//Use body parser for parsing application/json 
app.use(body_parser.json());

// Passport middleware for token authentication
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

//Static folder for Client part
app.use(express.static(path.join(__dirname,"public")));

//Router for the /users api
app.use("/api", api);

app.get("*", (req,res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"));
})

//Starts the server
app.listen(port, function () {
    console.log("The server has started at port " + port);
});


