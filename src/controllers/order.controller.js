const db = require("../models");

module.exports = {
    // controller to get all orders
    getOrders: async (req, res) => {

        try {
    
            const orders = await db.Order.findAll();
    
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
            console.error("Error fetching orders:", err);
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
   
    },

    // // controller to get a specific order by id_user
    // getOrder: async (req, res) => {

    //     try {

    //         // Extract data from the request body
    //         const { user_id } = req.body;

    //         // Check if the clientexist
    //         const userExists = await db.User.findByPk(user_id);

    //         if (!userExists) {
    //             return res.status(404).json({
    //             success: false,
    //             message: "User not found",
    //             });
    //         }

    //         const orders = await db.Order.findAll(
    //             { user_id },
    //             { 
    //             fields: ["id_user"],
    //             }
    //         );

    //         // return the Orders of user in JSON format
    //         return res.status(200).json({
    //             results: orders,
    //             success: true,
    //         });

    //     } catch (err) {
    //         // if an error occurs, return a 500 status code with the error message
    //         return res.status(500).json({ message: err.message });
    //     }
    // },

};