const {Auth} = require("../models");

const authController = async (req, res) => {
    try {
        
    } catch (error) {
        console.error("Error in authController:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { authController };
