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
  
  // Index -- DONE
  app.get("/pokemon/", (req, res) => {
    res.render("index.ejs", { allPokemon: pokemon });
  });
  
  // New Route -- DONE
  app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
  });
  
  //Delete -- DONE
  app.delete("/pokemon/:id", (req,res)=>{
    const index = req.params.id
    pokemon.splice(index, 1)
    res.redirect("/pokemon")
  })

  //Update
 app.put("/pokemon/:id", (req, res) => {
    let updatedPokemon = {...pokemon[req.params.id]}
    pokemon[req.params.id] = updatedPokemon
    updatedPokemon.name = req.body.name
    updatedPokemon.img = req.body.img
    updatedPokemon.type = [req.body.type[0], req.body.type[1]]
    updatedPokemon.stats= {
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
        speed: req.body.speed
    }
   
   
    console.log(updatedPokemon.stats.hp)
      res.redirect(`/pokemon/${req.params.id}`)
})
  

 //Create
 app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
  });

//edit
app.get("/pokemon/:id/edit", (req,res)=>{
     res.render("edit.ejs",{ 
        poke:pokemon[req.params.id],
        index:req.params.id
    })
})

// Show -- DONE
app.get("/pokemon/:id", (req, res) => {
 res.render("show.ejs", { poke: pokemon[req.params.id] });
});
  

app.listen(PORT, () => {
    console.log(`We are listening on port ${PORT}`);
  });