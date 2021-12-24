const express = require("express");
const app = express();
const port = 5000;

// Add headers
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// Create a GET route
app.get("/", (req, res) => {
    const test = [
        { id: 1, nickname: "Joe" },
        { id: 2, nickname: "Matt" },
        { id: 3, nickname: "Jenny" },
    ];

    res.json(test);
});

// Display message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));
