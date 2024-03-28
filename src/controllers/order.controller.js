const db = require("../models");
const refundMail = require("../utils/refundMail");
module.exports = {
    // controller to get all orders
    getOrders: async (req, res) => {
        try {
            const ordersWithUsers = await db.Orders.findAll({
                include: [
                    {
                        model: db.User,
                        as: "users", // Utilisez l'alias spécifié dans votre association
                    },
                ],
            });

            if (ordersWithUsers.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "No orders found",
                });
            }

            return res.status(200).json({
                results: ordersWithUsers,
                success: true,
            });
        } catch (err) {
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
                attributes: [
                    "id",
                    "order_date",
                    "status",
                    "delivery_mode",
                    "delivery_address",
                    "delivery_city",
                    "delivery_zipcode",
                    "total_price",
                ], // Spécifier les colonnes à inclure dans les résultats
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
        try {
            const orderId = req.params.id;

            if (!orderId) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            const orderDetails = await db.Order_Details.findAll({
                where: { order_id: orderId },
                include: [
                    {
                        model: db.Product,
                        as: "products",
                    },
                ],
            });

            const ordersInfo = await db.Orders.findAll({
                where: { id: orderId },
            });
            const usersInfo = await db.User.findOne({
                where: { id: ordersInfo[0].user_id },
            });

            // Renvoyer les détails de commande et les informations de commande séparément
            const finalResult = {
                results: orderDetails,
                orders: ordersInfo,
                user: usersInfo,
                success: true,
            };

            return res.status(200).json(finalResult);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    refundedOrder: async (req, res, next) => {
        const orderId = req.params.id;
        try {
            const order = await db.Orders.findByPk(orderId);
            console.log(order.user_id);
            const user = await db.User.findByPk(order.user_id);
            console.log(user.email);
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }

            const ordersRefunded = await db.Orders.findAll({
                where: {
                    id: orderId,
                    status: "refunded on demand",
                },
            });

            if (ordersRefunded.length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "Error: No orders found requesting refund",
                });
            }

            await db.Orders.update(
                { status: "refunded" }, // Mettre "refunded" comme nouveau statut
                { where: { id: orderId } }
            );

            await refundMail.refundMail(res, user.email, orderId);
            return res.status(200).json({
                success: true,
                message: "Order status updated to 'refunded' successfully",
            });
        } catch (error) {
            console.error("Error updating order status:", error);
            return res.status(500).json({
                success: false,
                message: "Error updating order status",
                error: error.message, // Envoyer le message d'erreur pour le débogage
            });
        }
    },
};
