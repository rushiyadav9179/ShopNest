const Order = require('../model/Order.js');

const sendEmail = require('../utils/sendEmail.js');

// Create a new order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }
        else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId,
            });
            await order.save();
            const message = `Dear ${req.user.name},\n\n thank you for your order!. Your order has been placed successfully created with the following details: Order ID: ${order._id}\n Total Amount: $${order.totalAmount}\n Shipping Address: ${order.address.fullName}, ${order.address.street}, ${order.address.city}, ${order.address.postalCode}, ${order.address.country}\n we will notify you once it's shipped.\nThank you for shopping with us!\n\nBest regards,\nShopNest Team`;

            await sendEmail(req.user.email, 'Order Confirmation', message);
            res.status(201).json({message: 'Order created successfully', order });            
        }
    } catch (error) {      
        res.status(500).json({ message: 'Error creating order', error });
    }
};

// const myOrders = async (req, res) => {
//     try {
//         const orders = await Order.find({ user: req.user._id }).populate('items.productID', 'name price');
//         res.json(orders);   
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };
const myOrders = async (req, res) => {
    try {

        console.log("========== MY ORDERS ==========");
        console.log("User ID:", req.user._id);

        const orders = await Order.find({
            user: req.user._id
        }).populate("items.productID", "name price");

        console.log("Orders Found:", orders);

        res.json(orders);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error fetching orders",
            error
        });
    }
};


const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user', 'id name');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found', error });
        }
        order.status = status;
        await order.save();
        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};
