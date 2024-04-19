const { Auth } = require("../models");


const authController = async (req, res) => {
    try {
       const response = await Auth.findOne({
            where: {
                googleId: req.body.googleId
            },
       })

       res.status(200).send({
         success:true,
         message:"User found",
         data:response
       })

    } catch (error) {
        console.error("Error in authController:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { authController };
