var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  type: "SMTP",
  host: "smtp.gmail.com",
  secure: true,
  auth: {
    user: "kirti.sharma@athenalogics.com",
    pass: "athena@123123"
  }
});

exports.sendAMail = function(email, subject, body, res) {
  var mailOptions = {
    from: "athenataskapp@athenalogics.com",
    to: email,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
        if(res)
            res.end("Email sent");
    }
  });
};
