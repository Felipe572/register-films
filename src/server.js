const express = require("express");

const app = express();

app.get("/", (request, response) => {
    response.send("Hello, world!!")
});

const PORT = 3232;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));