const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose")

const app = express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("../public"));


// const for DB
const url = "mongodb://localhost:27017/";
const dbName = "keeper-db";
const opts = "";

// create DB connection string
const connectStr = url + dbName + opts;

// create a new DB
mongoose.connect(connectStr, {useNewUrlParser: true});

// create a new Schema
const noteSchema = new mongoose.Schema( 
    {
        title: String,
        content: String,
    }
);


  
// create a new Model
const Note = mongoose.model("Note", noteSchema);

////////////
// Routes for generic notes
//
////

app.route("/notes")
.get(function(req, res) {
   Note.find({}, null)
   .then( docs => res.send(docs) )
   .catch( err => res.send(err) );
    
})
.post(function(req, res) {
    console.log(req.body.title);
    console.log(req.body.content);
    //console.log(req.body);
    //new Note({title: req.body.note.title, content: req.body.note.content}).save()
    new Note({title: req.body.title, content: req.body.content}).save()
    .then( (savedDoc) => {
         const newId = (savedDoc._id.toString()); 
         console.log(savedDoc);
         console.log(newId);
         console.log("POST");
         //res.send("New note has been correctly added");
         //res.send(savedDoc);
         //res.send(JSON.stringify(savedDoc));
         return res.status(201).json({
            success: true,
            id: newId,
            message: 'Note created!'
         })
    })
    .catch( (err) => { 
         console.log(err);
         //res.send(err);
    });
})


////////////
// Routes for specific notes
//
////
app.route("/notes/:id")
.put(function(req, res) {
    Note.findOneAndReplace(
        {title: req.params.title},
        {
            title: req.body.title,
            content: req.body.content,
            _id: req.body.noteId
        }
    )
    .then( () => res.send("note successfully replaced"))
    .catch( err => res.send(err) )
})
.delete(function(req, res) {
    //Note.findOneAndDelete(
    console.log(req);
    console.log("****************  req.params")
    console.log(req.params);
    console.log("****************  req.params._id")
    console.log(req.params._id);
    console.log("****************  req.params.id")
    console.log(req.params.id);
    console.log("DELETE");
    Note.findOneAndDelete(
        {_id: req.params.id}
    )
    .then( () => res.send("note successfully deleted"))
    .catch( err => res.send(err) )
});



app.listen(5000, () => {
    console.log("Server started on port 5000");
});

