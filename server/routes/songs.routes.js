module.exports = app => {
    const songs = require("../controllers/song.controller");
  
    var router = require("express").Router();
  
    // Create a new Song
    router.post("/", songs.create);
  
    // Retrieve all Songs
    router.get("/", songs.findAll);
  
    // Retrieve all published Songs
    router.get("/published", songs.findAllPublished);
  
    // Retrieve a single Song with id
    router.get("/:id", songs.findOne);
  
    // Update a Song with id
    router.put("/:id", songs.update);
  
    // Delete a Song with id
    router.delete("/:id", songs.delete);
  
    // Delete all Songs
    router.delete("/", songs.deleteAll);
  
    app.use("/api/songs", router);
  };