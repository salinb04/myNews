//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require('dotenv').config();

console.log(process.env);

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,

                }
            }
        ]
    };


    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/fede2b465e";

    const options = {
        method: "POST",
        auth: "testing:a7d3b66f03fd73cc3e05adb91c10addd-us17"
    };

    const api_key = process.env.API_KEY;

    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/categories.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }


        response.on("data", function (data) {
            console.log(JSON.parse(data));
        });
    });

    request.write(jsonData);
    request.end();

});

app.post("/failure", function (req, res) {
    res.redirect("/")
})


app.listen(process.env.PORT || 3000, function () {
    console.log("Server is listening on Port 3000");
});



// old API KEY:430d76bde8dfb402eee96dcea160cc8a-us17

// API KEY: a7d3b66f03fd73cc3e05adb91c10addd-us17

// list id fede2b465e