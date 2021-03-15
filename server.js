const express = require('express');
const path = require('path');
const app = express();
const config = require('./config');
const cors = require('cors');
app.use(express.json());
app.use(cors());
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://main:main@cluster0.gyqur.mongodb.net/main?retryWrites=true&w=majority');
var bookSchema = mongoose.Schema({
   title: String,
   authors: String,
   description: String,
   image: String,
   link: String,
   saved: String
} ,
{ timestamps: true });

bookSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

var book = mongoose.model("book", bookSchema);

const staticfolder = path.join(__dirname, 'build');
// console.log(staticfolder)


app.use(express.static(staticfolder))
app.get("/books", (req, res ) => {
    book.find().then(books => {
        // console.log(books)
        res.send(books)
       console.log(books) 
    })
})

app.delete("/books", (req, res) => {
    book.deleteMany({}, ()=>{
        console.log("all books deleted")
        res.send({msg: "all uers deleted"})
    })
})

app.delete("/book/:id", (req, res) => {
    book.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return (error);
          } else {
            console.log("book deleted")
            res.send({msg: "book deleted"})
          }
    })
})

app.put("/book/:id", (req, res, next) => {
    console.log('test44');
    console.log('Edit happened2', req.body)
    book.findByIdAndUpdate(req.params.id, { $set: req.body}, (error, data) => {
        if (error) {
            return next(error);
            // console.log(error)
          } else {
            console.log("book edited", data)
            res.send({msg: "book edited"})
          }
    })
})
  

app.get("*", (req, res) => {
    res.sendFile(path.join(staticfolder, "index.html"));
})

/* app.get("/books/:id", (req, res) => {
    req.id
}) */


app.post("/addbook", (req, res) => {
    // console.log(req.body)
    var myData = new book(req.body);
    myData.save()
        .then(item => {
            res.send(item);
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
 });

 

const port = process.env.PORT || 5000;

app.listen(port, () => {
    "running server!"
})


