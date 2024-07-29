const { where } = require("sequelize");
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
            id: currentUserId
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

const registerGoogleAuthData = async(req, res) => {
    try {
        console.log(req.body);
        
        const authData = await Auth.findOne({
            where: {
                googleId: req.body.googleId
            }
        });
        
        if (!authData) {
            const user = await Auth.create({
                googleId: req.body.googleId,
                    displayName: req.body.displayName,
                    email: req.body.email,
                    ImageLink: req.body.ImageLink,
                    emailVerified: req.body.emailVerified,
              });
        
              console.log("Google signIn Successful and Database Data added successfully");
        
    
            res.status(200).send({
                success: true,
                message: "User Registered",
                user: {
                  id: user.id,
                  displayName: user.displayName,
                  email: user.email,
                  ImageLink: user.ImageLink
                }
              });
        }
        
        res.status(200).send({
            success: true,
            message: "User Exist",
            user: {
                id: authData.id,
                displayName: authData.displayName,
                email: authData.email,
                ImageLink: authData.ImageLink
              }
        });

        
    } catch (error) {
        console.error("Error in registerAuthData:", error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



const signInAuth = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await Auth.findOne({
        where: { username, password },
      });
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password',
        });
      }
  
      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.ImageLink,
        },
      });
    } catch (error) {
      console.error("Error in signInAuth:", error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

const registerAuthData = async(req, res) => {
    try {
        console.log(req.body);
        
        const authData = await Auth.findOne({
            where: {
                username: req.body.username
            }
        });
        
        if (!authData) {
            const user = await Auth.create({
                // displayName: req.body.displayName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                ImageLink: req.body.ImageLink,
                emailVerified: req.body.emailVerified,
              });
        
              console.log("User registered successfully and data added to database");
        

            res.status(200).send({
                success: true,
                message: "User Authenticated",
                user: {
                  id: user.id,
                  username: user.username,
                  email: user.email,
                  ImageLink: user.ImageLink
                }
              });
        } else {
            res.status(200).send({
                success: true,
                message: "User name is already taken",
            });
        }
        
    } catch (error) {
        console.error("Error in registerAuthData:", error);
        res.status(500).json({ error: 'Internal server error' });
    }

}



module.exports = { authController , getCurrentUserAuthData, registerGoogleAuthData, registerAuthData, signInAuth };
