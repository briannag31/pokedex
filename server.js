const express = require("express")
const app = express()
const PORT = 3000
const pokemon = require("./models/pokemon.js");
const morgan = require("morgan")
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: false}));
app.use(morgan("tiny"))
app.use(methodOverride("_method")) 
app.use("/static", express.static("public"))




















app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
  });