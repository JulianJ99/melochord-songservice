const express = require('express')
const app = express()
const port = 3002
const cors = require("cors");

const song_model = require('./models/songs.model')

app.use(express.json());
const corsOptions ={
    origin:['http://localhost:3000'], 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))


app.use(function(req,res,next){  
  res.header('Access-Control-Allow-Origin','http://localhost:3000')  
  next(); 
})

app.get('/', (req, res) => {
  song_model.getSongs()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/songs', (req, res) => {
  song_model.createSong(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/songs/:id', (req, res) => {
  song_model.deleteSong(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.put("/songs/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  song_model
    .updateSong(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
