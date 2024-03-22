const Product = require('../models/Product');
const Orders = require('../models/Order');

/**
 * @swagger
 * components:
 *   schemas:
 *     Order_Details:
 *       type: object
 *       required:
 *         - order_id
 *         - product_id
 *         - quantity
 *         - unit_price
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the order detail
 *         order_id:
 *           type: integer
 *           description: The ID of the order associated with the order detail
 *         product_id:
 *           type: integer
 *           description: The ID of the product associated with the order detail
 *         quantity:
 *           type: integer
 *           description: The quantity of the product in the order detail
 *         unit_price:
 *           type: number
 *           format: float
 *           description: The unit price of the product in the order detail
 *       example:
 *         id: 1
 *         order_id: 1
 *         product_id: 1
 *         quantity: 2
 *         unit_price: 25.5
 */

module.exports = (sequelize, DataTypes) => {
  const Order_Details = sequelize.define(
    'Order_Details',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Orders, 
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product, 
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      unit_price: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
    },
    {
      tableName: 'Order_Details',
      timestamps: false,
    }
  );

  return Order_Details;
};
