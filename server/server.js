const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

// app
const app = express();

// db
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
})
    .then(() => console.log("DB CONNECTED"))
    .catch((err) => console.log("DB CONNECTION ERR", err));

// middlewares

// It is a great tool that logs the requests along with some other information depending upon its configuration and the preset used.
app.use(morgan("dev"));

// bodyParser->This middleware is used to parse the body of an HTTP request, which can contain JSON data or other types of data
// available under the req.body property
app.use(bodyParser.json({limit: "2mb"}));
app.use(cors());

// route
app.get("/api", (req, res) => {
    res.json({
        data: "hey you hit node API",
    });
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
