const express =  require('express');
const Admin = require('../model/Admin');
const jwt = require('jsonwebtoken');

const router =  express.Router();

const JWT_SECRET = "8261ba19898d0dcefe6c0c411df74b587b2e54538f5f451633b71e39f957cf01";


router.post("/admin", async (req, res) => {
    const {username, password} = req.body;
    try {
        const admin =  await Admin.findOne({username});
        
        if(!admin) {
            res.status(404).send({message: "Admin not found!"})
        }
        if(admin.password !== password) {
            res.status(401).send({message: "Invalid password!"})
        }
        
        const token =  jwt.sign(
            {id: admin._id, username: admin.username, role: admin.role}, 
            JWT_SECRET,
            {expiresIn: "1h"}
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
        
    } catch (error) {
       console.error("Failed to login as admin", error)
       res.status(401).send({message: "Failed to login as admin"}) 
    }
})

module.exports = router;