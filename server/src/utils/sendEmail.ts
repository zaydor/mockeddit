import nodemailer from "nodemailer";

export async function sendEmail(to: string, subject: string, html: string) {
  // generate test SMTP service account from ethereal.email
  // only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  // console.log("testAccount ", testAccount);

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for others
    auth: {
      user: "oju2xeyrbl24murj@ethereal.email", // generated ethereal user
      pass: "3mMVZU15eAve9bxn4W", // generate ethereal password
    },
  });

  // send mail with define transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo" <foo@example.com>', // sender address
    to: to, // ;ist of receivers
    subject: subject, // Subject line
    // text: text, // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
