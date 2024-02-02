module.exports = (sequelize, DataTypes) => {
    // Definition of the Product model
    const Product = sequelize.define(
        "Product",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            thumbnail: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            packshot: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "Product",
            timestamps: false,
        }
    );

    return Product;
};
