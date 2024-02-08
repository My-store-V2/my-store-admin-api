/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstname
 *         - lastname
 *         - email
 *         - admin
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *         firstname:
 *           type: string
 *           description: The first name of the user
 *         lastname:
 *           type: string
 *           description: The last name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         zipcode:
 *           type: integer
 *           description: The postal code of the user
 *         city:
 *           type: string
 *           description: The city of the user
 *         phone:
 *           type: string
 *           description: The phone number of the user
 *         admin:
 *           type: boolean
 *           description: The role of the user
 *       example:
 *         id: 1
 *         firstname: "John"
 *         lastname: "Doe"
 *         email: "john.doe@gmail.com"
 *         password: "password123"
 *         address: "1 rue de la paix"
 *         zipcode: 75001
 *         city: "Paris"
 *         phone: 123456789
 *         admin: false
 */

module.exports = (sequelize, DataTypes) => {
  // Definition of the User model
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zipcode: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "User",
      timestamps: false,
    }
  );

  return User;
};
