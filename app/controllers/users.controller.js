

const db = require('../config/db.config.js');
const User = db.User;

exports.create = (req, res) => {
    let user = {};

    try {
        // Construyendo el objeto User desde el cuerpo de la solicitud
        user.name = req.body.name;
        user.lastname = req.body.lastname;
        user.email = req.body.email;
        user.phone = req.body.phone;
        user.address = req.body.address;
        user.datetry = req.body.datetry;
        user.state = req.body.state;

        // Guardar en la base de datos
        User.create(user).then(result => {
            res.status(200).json({
                message: "Upload Successfully a User with id = " + result.id_User,
                user: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllUsers = (req, res) => {
    // Recuperar toda la información de User
    User.findAll()
        .then(userInfos => {
            res.status(200).json({
                message: "Get all Users' Infos Successfully!",
                users: userInfos
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

exports.getUserById = (req, res) => {
    let userId = req.params.id;
    User.findByPk(userId)
        .then(user => {
            res.status(200).json({
                message: "Successfully Get a User with id = " + userId,
                user: user
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
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "Not Found for updating a User with id = " + userId,
                user: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                name: req.body.name,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                state: req.body.state
            };

            let result = await User.update(updatedObject, { returning: true, where: { id_User: userId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Can not update a User with id = " + req.params.id,
                    error: "Can NOT Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a User with id = " + userId,
                user: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can not update a User with id = " + req.params.id,
            error: error.message
        });
    }
}

exports.deleteById = async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({
                message: "Does Not exist a User with id = " + userId,
                error: "404",
            });
        } else {
            await user.destroy();
            res.status(200).json({
                message: "Delete Successfully a User with id = " + userId,
                user: user,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Can NOT delete a User with id = " + req.params.id,
            error: error.message,
        });
    }
}
