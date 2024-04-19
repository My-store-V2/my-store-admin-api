const User = require("../models/User");

/**
 * @swagger
 * components:
 *   schemas:
 *     Orders:
 *       type: object
 *       required:
 *         - user_id
 *         - order_date
 *         - delivery_mode
 *         - total_price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the wishlist item
 *         user_id:
 *           type: string
 *           description: The ID of the user (client) associated with the order item
 *         order_date:
 *           type: string
 *           format: date
 *           description: The date of the order passed
 *         status:
 *           type: string
 *           description: The status of the order
 *         delivery_mode:
 *           type: string
 *           description: The delivery mode of the order
 *         delivery_address:
 *           type: string
 *           description: The delivery address of the order
 *         delivery_city:
 *           type: string
 *           description: The delivery city of the order
 *         delivery_zipcode:
 *           type: int
 *           description: The delivery zipcode of the order
 *         total_price:
 *           type: int
 *           format: int
 *           description: The total price of the order
 *       example:
 *         id: 1
 *         user_id: 0446eb8b-d7bc-11ee-9a02-42010a400006
 *         order_date: "2022-01-01"
 *         status: payed
 *         delivery_mode: "delivery"
 *         delivery_address: "1234 Main St"
 *         delivery_city: "Anytown"
 *         delivery_zipcode: 12345
 *         total_price: 50
 */

module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define(
        "Orders",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.TEXT,
                allowNull: false,
                references: {
                    model: User, // Assuming Client is the Sequelize model for clients
                    key: "id",
                },
            },
            order_date: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_mode: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_address: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_city: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            delivery_zipcode: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            stripe_payment_id: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            stripe_client_secret: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
        },
        {
            tableName: "Orders",
            timestamps: false,
        }
    );
    Orders.associate = (models) => {
        Orders.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "users",
        }); // Orders appartient à User
        Orders.hasMany(models.Order_Details, {
            foreignKey: "order_id",
            as: "order_details",
        }); // Orders a plusieurs Order_Details
    };

    return Orders;
};
