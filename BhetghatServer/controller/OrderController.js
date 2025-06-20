require("dotenv").config();
const Order = require("../model/Order");
const Product = require("../model/Product");
const nodemailer = require("nodemailer");

// ✅ Create a new order and send product files via email
const createAOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    const products = await Product.find({ _id: { $in: savedOrder.productIds } });
    const productFiles = products.map(product => product.eventFile).filter(Boolean);

    // ✅ Use environment variables for secure credentials
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      secure: true,
      port: 465,
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"SonicSummit" <${process.env.EMAIL_USER}>`,
      to: savedOrder.email,
      subject: "Your Order Confirmation",
      text: `Hello ${savedOrder.name},\n\nThank you for your order. Please find the product files attached.`,
      attachments: productFiles.map(file => ({
        filename: file.split("/").pop(),
        path: file,
      })),
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json(savedOrder);
  } catch (error) {
    console.error("Error creating order", error);
    res.status(500).json({ message: "Failed to create order", error: error.message });
  }
};

// ✅ Get orders by email
const getOrderByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders", error);
    res.status(500).json({ message: "Failed to fetch order", error: error.message });
  }
};

// ✅ Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();

    if (!orders.length) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching all orders", error);
    res.status(500).json({ message: "Error fetching all orders", error: error.message });
  }
};

module.exports = {
  createAOrder,
  getOrderByEmail,
  getAllOrders,
};
