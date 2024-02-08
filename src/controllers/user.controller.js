const db = require("../models");

module.exports = {
  // controller to get all Users

  getUsers: async (req, res) => {
    try {
      // retrieve all Users using Sequelize's findAll() method
      const users = await db.User.findAll();

      if (users.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No Users found",
        });
      }

      // return the Users in JSON format
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
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Bad request. No id provided",
        });
      }

      // retrieve the User with Sequelize's findByPk() method
      const user = await db.User.findByPk(req.params.id);

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
      res.status(500).json({ message: err.message });
    }
  },

  // controller to update a User
  updateUser: async (req, res) => {
    try {
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Bad request. No id provided",
        });
      }

      // retrieve the User with Sequelize's findByPk() method
      const user = await db.User.findByPk(req.params.id);

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
      if (isNaN(req.params.id)) {
        return res.status(400).json({
          success: false,
          message: "Bad request. No id provided",
        });
      }

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
