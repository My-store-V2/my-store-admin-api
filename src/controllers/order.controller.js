const db = require("../models");

module.exports = {

    // controller to get all orders
    getOrders: async (req, res) => {

        try {
    
            const orders = await db.Orders.findAll();
    
            if (orders.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found",
                });
            }
    
            return res.status(200).json({
            results: orders,
            success: true,
            });
    
        } 
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
   
    },

    // controller to get a specific order by user_id
    getOrderOfUser: async (req, res) => {

        try {

            const user = await db.User.findByPk(req.params.id, {
                attributes: { exclude: ["password"] },
            });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            const orders = await db.Orders.findAll({
                where: { user_id: req.params.id },
                attributes: ["id", "order_date", "status", "delivery_mode", "delivery_address", "delivery_city", "delivery_zipcode", "total_price"] // Spécifier les colonnes à inclure dans les résultats
            });

            return res.status(200).json({
                results: orders,
                success: true,
            });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    //controller to get details of order by order_id
    getOrderDetail: async (req, res) => {

        try{

            const order = await db.Orders.findByPk(req.params.id);

            if(!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            const orders = await db.Order_Details.findAll({
                where: { order_id: req.params.id },
            });

            return res.status(200).json({
                results: orders,
                success: true,
            });

        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

};