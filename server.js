// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// use json
app.use(bodyParser.json());

// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './client/dist')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));

// require mongoose
var mongoose = require('mongoose');
// Connect to database
mongoose.connect('mongodb://localhost/TeamManager');
mongoose.Promise = global.Promise;

// create schema and model
let Schema = mongoose.Schema;
let PlayerSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2},
    position: { type: String }},
    {timestamps: true});

let Player = mongoose.model("Player", PlayerSchema);

// Routes
// Root Request
// get all players
app.get('/players', function(req, res) {
    Player.find({}, function(err, players) {
        if (err) {  
            console.log("Error retrieving players");
            console.log(err)
            res.json({message: "Error", error: err});
        } 
        // console.log('posts: ', posts)
        res.json({message: "Success", data: players});
    })
})

app.get('/players/list', (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
})

app.get('/players/addplayers', (req, res, next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
})

// get one player
app.get('/players/:id', function(req, res) {
    console.log("enter get")
    Player.findOne({_id: req.params.id}, function(err, player) {
        if(err) {
            console.log('Error retrieving data');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully retrieved a player');
            res.json({message: "Success", data: player});
        }
    })
})

// create new player
app.post('/players', function(req, res) {
    console.log(req.body)
    var player = new Player({name: req.body.name, 
                    position: req.body.position});
            
    // Try to save that new player to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
    player.save(function(err) {
        // if there is an error console.log that something went wrong!
        if(err) {
            console.log('Error saving new player');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully added a player');
            res.json({message: "Success", data: player});
        }
    })
})

// update player
app.put('/players/:id', function(req, res) {
    Player.findOneAndUpdate({_id: req.params.id}, 
                        {$set: { name: req.body.name, position: req.body.position}}, 
                        null, function(err) {
        if(err) {
            console.log('Error during player update');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully updating a player');
            res.json({message: "Success"});
        }
    })
})

// delete player
app.delete('/players/:id', function(req, res) {
    Player.deleteOne({_id: req.params.id}, function(err) {
        if(err) {
            console.log('Error during delete');
            res.json({message: "Error", error: err})
        } else { // else console.log that we did well and then redirect to the root route
            console.log('Successfully deleting a player');
            res.json({message: "Success"});
        }
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
});

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("Team Manager listening on port 8000");
})
