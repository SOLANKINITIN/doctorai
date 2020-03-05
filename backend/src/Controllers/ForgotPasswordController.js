const config = require("config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const crypto = require("crypto");

const { User } = require("Models");

const forgotPassword = async (req, res, next) => {
  //checking user
  const { username } = req.body;
  let msg = [];
  if (!username) {
    msg.push("Username is required");
  }

  if (!username) {
    res.status(404);
    res.json({
      code: 401,
      data: {
        msg
      },
      success: false
    });
    return;
  }

  let user = await User.findOne({ username });
  if (!user) {
    res.status(401);
    res.json({
      code: 403,
      data: {
        message: "User is not found in database"
      },
      success: false
    });
    return;
  }
  const expiredOn = Date.now() + 1000 * 60 * 60;
  // const authInfo = {
  //   expiredOn,
  //   username
  // };
  // const token = jwt.sign(JSON.stringify(authInfo), config.get("jwt").secret);
  const token = crypto.randomBytes(20).toString("hex");
  await User.findByIdAndUpdate(
    { _id: user._id },
    { resetPasswordToken: token },
    { reset_password_expires: expiredOn }
  );
  //node-mailer,
  var transport = {
    service: "Gmail",
    auth: {
      user: config.get("user"),
      pass: config.get("password")
    }
  };
  var transporter = nodemailer.createTransport(transport);
  transporter.verify((err, success) => {
    try {
      if (success) {
        console.log("validation is COrrect...");
      }
    } catch (error) {
      if (error) {
        console.log("somthing Wrong with Your Authentication", err);
      }
    }
  });
  let message = `Hey,We are receive Your Request Thank you...`;
  var mail = {
    from: config.get("user"),
    to: username,
    subject: "Link To Reset Password",
    text:
      "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
      "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
      `http://localhost:3000/reset/${token}\n\n` +
      "If you did not request this, please ignore this email and your password will remain unchanged.\n"
  };

  //sending mail
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.status(400);
      return res.json({
        success: false,
        message: "message Could not send",
        err: err
      });
    } else {
      res.status(200);
      return res.json({
        success: true,
        message: "Kindly Check Your Email for  further instructions "
        // data: data
      });
    }
  });
};

//RESET-PASSWORD

const resetPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: req.params.resetPasswordToken,
      resetPasswordExpires: {
        $gt: Date.now()
      }
    });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Password reset token is invalid or has expired." });
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.save(err => {
      if (err) {
        return res.status(422).send({
          message: err
        });
      } else {
        var resetMail = {
          from: config.get("user"),
          to: user,
          subject: "Password Reset Confirmation",
          text: "hey your password reset successfully..."
        };
        transporter.sendMail(resetMail, (err, data) => {
          if (err) {
            res.status(400);
            return res.json({
              success: false,
              message: "message Could not send",
              err: err
            });
          } else {
            res.status(200);
            return res.json({
              success: true,
              message: "Message reset succesfully"
              // data: data
            });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

// const updatepassword = async (req, res, next) => {
//   try {
//     const user = await User.findOne({
//       where: {
//         username: req.body.username
//       }
//     });
//     if (user != null) {
//       console.log("user is in db");
//     }
//     const hasepassword = await bcrypt.hash(req.body.password, 10);
//     await user.update({
//       password: hasepassword,
//       resetPasswordToken: null,
//       resetPasswordToken: null
//     });
//     console.log("password is update");
//     res.status(200).send({ message: "update password" });
//   } catch (error) {
//     console.log(error);
//   }
// };
// const getToken = async (req, res) => {
//   const user = await User.findOne({
//     where: {
//       resetPasswordToken: req.params.resetPasswordToken,
//       resetPasswordExpires: {
//         $gt: Date.now()
//       }
//     }
//   });
//   if (user === null) {
//     res.send("user is null");
//   } else {
//     res.send("ok");
//   }

//   res.send(response);
// };

module.exports = {
  forgotPassword,
  resetPassword

  // updatepassword
};
