const db = require("../models");
const { use } = require("../routes/user.route");

module.exports = {
    // controller to get all Users

    getUsers: async (req, res) => {
        try {
            // retrieve all Users using Sequelize's findAll() method
            const users = await db.User.findAll({
                attributes: { exclude: ["password"] },
            });

            if (users.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No Users found",
                });
            }

            return res.status(200).json({
                results: users,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // controller to get a specific User by id

    getUser: async (req, res) => {
        try {
            // retrieve the User with Sequelize's findByPk() method
            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // return the User in JSON format
            return res.status(200).json({
                results: user,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            return res.status(500).json({ message: err.message });
        }
    },

    // controller to add a new User
    createUser: async (req, res) => {
        try {
            // create a new User using Sequelize's create() method
            const newUser = await db.User.create(req.body);

            // return the new User in JSON format
            return res.status(201).json({
                results: newUser,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // controller to update a User
    updateUser: async (req, res) => {
        try {
            // retrieve the User with Sequelize's findByPk() method
            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // update the User's attributes
            await user.update(req.body);

            // return the updated User in JSON format
            return res.status(200).json({
                results: user,
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },

    // controller to delete a User
    deleteUser: async (req, res) => {
        try {
            // retrieve the User with Sequelize's findByPk() method
            const user = await db.User.findByPk(req.params.id);

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            // delete the User
            await user.destroy();

            // return a 204 status code
            return res.status(204).json({
                success: true,
            });
        } catch (err) {
            // if an error occurs, return a 500 status code with the error message
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    },
};
