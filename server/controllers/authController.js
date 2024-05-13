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


const getCurrentUserAuthData = async(req,res)=>{
 try {
    console.log(req.body);
    const currentUserId = req.body.currentUserId

    const authData = await Auth.findOne({
        where: {
            googleId: currentUserId
        },
    })

    res.status(200).send({
        success:true,
        message:"User found",
        data:authData
    })
    
 } catch (error) {
    res.status(400).send({
        message:"Error in getCurrentUserAuthData",
        error:error.message
    })
 }
}

module.exports = { authController , getCurrentUserAuthData };
