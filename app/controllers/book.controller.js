const db = require('../config/db.config.js');
const Book = db.Book;

exports.create = (req, res) => {
    let book = {};

    try {
        // Construyendo el objeto Book desde el cuerpo de la solicitud
        book.titulo = req.body.titulo;
        book.autor = req.body.autor;
        book.isbn = req.body.isbn;
        book.editorial = req.body.editorial;
        book.anio_publicacion = req.body.anio_publicacion;
        book.categoria = req.body.categoria;
        book.cantidad_disponible = req.body.cantidad_disponible;
        book.ubicacion = req.body.ubicacion;

        // Guardar en la base de datos
        Book.create(book).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Book with id = " + result.id_libro,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllBooks = (req, res) => {
    // Recuperar toda la información de Book
    Book.findAll()
        .then(bookInfos => {
            res.status(200).json({
                message: "Get all Books' Infos Successfully!",
                books: bookInfos
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.getBookById = (req, res) => {
    let bookId = req.params.id;
    Book.findByPk(bookId)
        .then(book => {
            res.status(200).json({
                message: "Successfully Get a Book with id = " + bookId,
                book: book
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

exports.updateById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "Not Found for updating a Book with id = " + bookId,
                book: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                titulo: req.body.titulo,
                autor: req.body.autor,
                isbn: req.body.isbn,
                editorial: req.body.editorial,
                anio_publicacion: req.body.anio_publicacion,
                categoria: req.body.categoria,
                cantidad_disponible: req.body.cantidad_disponible,
                ubicacion: req.body.ubicacion
            };

            let result = await Book.update(updatedObject, { returning: true, where: { id_libro: bookId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a Book with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Book with id = " + bookId,
                book: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a Book with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let bookId = req.params.id;
        let book = await Book.findByPk(bookId);

        if (!book) {
            res.status(404).json({
                message: "Does Not exist a Book with id = " + bookId,
                error: "404",
            });
        } else {
            await book.destroy();
            res.status(200).json({
                message: "Delete Successfully a Book with id = " + bookId,
                book: book,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a Book with id = " + req.params.id,
            error: error.message,
        });
    }
}
