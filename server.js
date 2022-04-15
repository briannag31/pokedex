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

app.get("/", (req, res) => {
    res.send("You are home!");
  });
  
  // Index 
  app.get("/pokemon/", (req, res) => {
    //   res.send(pokemon)
    res.render("index.ejs", { allPokemon: pokemon });
  });
  
  // New Route
  app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
  });
  
  //Delete
  app.delete("/pokemon/:id", (req,res)=>{
    const index = req.params.id
    pokemon.splice(index, 1)
    res.redirect("/pokemon")
  })

  //Update
 app.put("/pokemon/:id", (req, res) => {
    pokemon[req.params.id] = req.body
      res.redirect("/pokemon")
})
  

 //Create
 app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    console.log(pokemon);
    res.redirect('/pokemon');
  });

//edit
app.get("/pokemon/:id/edit", (req,res)=>{
     res.render("edit.ejs",{ 
        poke:pokemon[req.params.id],
        index:req.params.id
    })
})

// Show
app.get("/pokemon/:id", (req, res) => {
 res.render("show.ejs", { poke: pokemon[req.params.id] });
});
  

  
  
  


















app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
  });