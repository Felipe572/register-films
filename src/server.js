const express = require("express");

const app = express();

const PORT = 3232;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));