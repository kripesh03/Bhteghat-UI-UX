const express = require('express');
const { createAOrder, getOrderByEmail, getAllOrders } = require('../controller/OrderController');

const router =  express.Router();

// create order endpoint
router.post("/", createAOrder);

// get orders by user email 
router.get("/email/:email", getOrderByEmail);

router.get("/", getAllOrders); 


module.exports = router;