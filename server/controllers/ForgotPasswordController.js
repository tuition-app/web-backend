const nodemailer = require("nodemailer");
const {Auth} = require("../models");
const bcrypt = require("bcrypt");

const ForgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body; 
    console.log(email);

    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);

    await Auth.findOne({where:{email:email}}).then((user)=>{
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
        pass: "iwzi aypi qapt qumk", 
        // user: "lankatution2000@gmail.com",
        // pass: "cpBIO#8292", 
      },
    });

    const details = {
      from: "lankatution2000@gmail.com",
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
    console.error("Error sending email:", error); 

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

     await Auth.findOne({where:{email:email}}).then((user)=>{
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
//  try {
//   const email = req.body.email;
//   const password = req.body.password;

//   const salt = await bcrypt.genSalt(10);
//   const NewhashedPassword = await bcrypt.hash(password, salt);

//   await User.findOne({where:{email:email}}).then((user)=>{
//     if(!user){
//       res.status(404).send({
//         success: false,
//         message: "User not found",
//       })
//     }

//     user.password = NewhashedPassword;   
//     user.save();

//     res.status(200).send({
//       success: true,
//       message: "Password changed successfully",

//     })


//   })
  
//  } catch (error) {
//    res.status(400).send({
//      success: false,
//      error: "Error sending email. Please try again later.",
     
//    })
//  }
const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  try {
    const user = await Auth.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    user.password = newPassword; 
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
}

module.exports = { ForgotPasswordController,ResetPasswordController,ChangePasswordController};
