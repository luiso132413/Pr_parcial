
let express = require('express');
let router = express.Router();
 
const users = require('../controllers/users.controller.js');
const book = require('../controllers/books.controller.js');
const author = require('../controllers/authors.controller.js');

router.post('/api/user/create', users.create);
router.get('/api/user/all', users.retrieveAllUsers);
router.get('/api/user/onebyid/:id', users.getUserById);
router.put('/api/user/update/:id', users.updateById);
router.delete('/api/user/delete/:id', users.deleteById);

router.get('/api/book/create', book.create);
router.get('/api/book/all', book.retrieveAllBooks);
router.get('/api/book/onebyid/:id', book.getBookById);
router.put('/api/book/update/:id', book.updateById);
router.delete('/api/book/delete/:id', book.deleteById);

router.get('/api/author/create', author.create);
router.get('/api/author/all', author.retrieveAllAuthors);
router.get('/api/author/onebyid/:id', author.getAuthorById);
router.put('/api/author/update/:id', author.updateById);
router.delete('/api/author/delete/:id', author.deleteById);


module.exports = router;