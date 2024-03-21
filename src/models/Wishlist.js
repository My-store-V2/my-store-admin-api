const User = require('../models/User');
const Product = require('../models/Product');

/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - id_client
 *         - id_product
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: The auto-generated ID of the wishlist item
 *         id_client:
 *           type: integer
 *           description: The ID of the client (user) associated with the wishlist item
 *         id_product:
 *           type: integer
 *           description: The ID of the product associated with the wishlist item
 *       example:
 *         id: 1
 *         id_client: 1
 *         id_product: 2
 */

module.exports = (sequelize, DataTypes) => {
  const Wishlist = sequelize.define(
    'Wishlist',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_client: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Assuming Client is the Sequelize model for clients
          key: 'id',
        },
      },
      id_product: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Product, // Assuming Product is the Sequelize model for products
          key: 'id',
        },
      },
    },
    {
      tableName: 'Wishlist',
      timestamps: true,
    }
  );

//   Wishlist.belongsTo(User, { foreignKey: 'id_client', as: 'client' });
//   Wishlist.belongsTo(Product, { foreignKey: 'id_product', as: 'product' });

  return Wishlist;
};
