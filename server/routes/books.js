// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find((err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  res.render('books/details', {
    title: 'Add Books',
    books: {}
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  book_data = req.body
  book.insertMany({
    Title: book_data.title,

    Price: book_data.price,
    Author: book_data.author,
    Genre: book_data.genre
  }).then((data) => {
    console.log('book data saves successfully ')
    console.log(data)
    res.redirect('/books')
  }).catch(err => {
    console.log(err)
  })

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  console.log(req.params);
  var bookId = new mongoose.mongo.ObjectId(req.params.id);
  book.findById(bookId).then(bookData => {
    console.log(bookData)
    res.render('books/details', {
      title: 'Add Books',
      books: bookData
    });
  }).catch(err => [
    console.log(err)
  ])
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/

  bookData = req.body;
  var bookId = new mongoose.mongo.ObjectId(req.params.id);
  console.log(bookData);
  book.findOneAndUpdate({_id:req.params.id}, { Title: bookData.title, Price: bookData.price, Author: bookData.author, Genre: bookData.genre }).
    then(data => {
      console.log(data)
      res.redirect('/books')
    }).catch(err => {
      console.log(err)
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  /*****************
   * ADD CODE HERE *
   *****************/
  book.findOneAndDelete({_id : req.params.id}).then(data=>{
    console.log('data deleted')
    res.redirect('/books')
  }).catch(err=>{
    console.log(err)
  })
});


module.exports = router;
