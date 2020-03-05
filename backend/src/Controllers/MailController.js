const nodemailer = require("nodemailer");
const config = require("config");
const { handleError } = require("Helper");

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
      console.log("Authentication is Valid...");
    }
  } catch (error) {
    if (error) {
      console.log("somthing Wrong with Your Authentication", err);
    }
  }
});

const SendMail = async (req, res, next) => {
  let message = `Hey,We are Receve Your Request Thank you...`;

  // if (!patientEmail) {
  //   res.send("PatientEmail  is Required");
  // }
  // if (!hospitalEmail) {
  //   res.send("HospitalEmail  is Required");
  // }

  // if (!patientEmail || !hospitalEmail) {
  //   res.send("HospialEmail and PatientEmail is Required");
  // }

  try {
    const patientmail = req.body.patientmail;
    const hospitalmail = req.body.hospitalmail;
    var mail = {
      from: patientmail,
      to: hospitalmail,
      subject: "Here Message is",
      text: message
    };
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
          message: "mail Send Successfully",
          data: data
        });
      }
    });
  } catch (err) {
    handleError(err);
    res.status(400);
    return res.json({
      success: false,
      error: err
    });
  }
};

module.exports = {
  SendMail
};
