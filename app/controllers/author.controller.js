const db = require('../config/db.config.js');
const Author = db.Author;

exports.create = (req, res) => {
    let author = {};

    try {
        // Construyendo el objeto Author desde el cuerpo de la solicitud
        author.nombre = req.body.nombre;
        author.apellido = req.body.apellido;
        author.nacionalidad = req.body.nacionalidad;
        author.fecha_nacimiento = req.body.fecha_nacimiento;

        // Guardar en la base de datos
        Author.create(author).then(result => {
            res.status(200).json({
                message: "Upload Successfully an Author with id = " + result.id_autor,
                author: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllAuthors = (req, res) => {
    // Recuperar toda la información de Author
    Author.findAll()
        .then(authorInfos => {
            res.status(200).json({
                message: "Get all Authors' Infos Successfully!",
                authors: authorInfos
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

exports.getAuthorById = (req, res) => {
    let authorId = req.params.id;
    Author.findByPk(authorId)
        .then(author => {
            res.status(200).json({
                message: "Successfully Get an Author with id = " + authorId,
                author: author
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
        let authorId = req.params.id;
        let author = await Author.findByPk(authorId);

        if (!author) {
            res.status(404).json({
                message: "Not Found for updating an Author with id = " + authorId,
                author: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                nacionalidad: req.body.nacionalidad,
                fecha_nacimiento: req.body.fecha_nacimiento
            };

            let result = await Author.update(updatedObject, { returning: true, where: { id_autor: authorId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update an Author with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully an Author with id = " + authorId,
                author: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update an Author with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let authorId = req.params.id;
        let author = await Author.findByPk(authorId);

        if (!author) {
            res.status(404).json({
                message: "Does Not exist an Author with id = " + authorId,
                error: "404",
            });
        } else {
            await author.destroy();
            res.status(200).json({
                message: "Delete Successfully an Author with id = " + authorId,
                author: author,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete an Author with id = " + req.params.id,
            error: error.message,
        });
    }
}
