const nodemailer = require("nodemailer");
const {User} = require("../models");
const bcrypt = require("bcrypt");

const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body; // Destructure email from req.body directly
    console.log(email);

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    await User.findOne({where:{email:email}}).then((user)=>{
      if(!user){
        res.status(404).send({
          success: false,
          message: "User not found",
        })
      }

    user.otp = otp;
    user.save();
     
    })

    const mailTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // Use secure connection (TLS)
      auth: {
        user: "tutztution@gmail.com",
        pass: "iwzi aypi qapt qumk", // Use correct password or app-specific password
      },
    });

    const details = {
      from: "tutztution@gmail.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}`,
    };

    await mailTransporter.sendMail(details);

    console.log("Email sent successfully");

    res.status(200).send({
      success: true,
      message: "Email sent successfully",
    });

  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging

    res.status(400).send({
      success: false,
      error: "Error sending email. Please try again later.",
    });
  }
};

const ResetPasswordController = async(req,res)=>{
  try {
     console.log(req.body);  
     const otp =  req.body.otp;
     const email = req.body.email;

     await User.findOne({where:{email:email}}).then((user)=>{
      if(!user){
        res.status(404).send({
          success: false,
          message: "User not found",
        })
      }
     
      if(user.otp == otp){
        res.status(200).send({
            success: true,
            message: "OTP verified successfully",
          })
      }else{
        res.status(400).send({
          success: false,
          message: "OTP verified Unsuccessfully",
        })
      }
     })

  } catch (error) {
      res.status(400).send({
        success: false,
        error: "Error sending email. Please try again later.",

      })  
  }
}

const ChangePasswordController = async(req,res)=>{
 try {
  const email = req.body.email;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const NewhashedPassword = await bcrypt.hash(password, salt);

  await User.findOne({where:{email:email}}).then((user)=>{
    if(!user){
      res.status(404).send({
        success: false,
        message: "User not found",
      })
    }

    user.password = NewhashedPassword;   
    user.save();

    res.status(200).send({
      success: true,
      message: "Password changed successfully",

    })


  })
  
 } catch (error) {
   res.status(400).send({
     success: false,
     error: "Error sending email. Please try again later.",
     
   })
 }
}

module.exports = { ForgotPasswordController,ResetPasswordController,ChangePasswordController};
