const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const methods = {
  sendResetPasswordMail: async (employeeName, email, token, res) => {
    try {
      const info = await transporter.sendMail({
        from: process.env.emailUser,
        to: email,
        subject: "Reset your Password",
        text: "Reset your forgot Password",
        html: `<p>Dear Employee,<br>
        It seems like you have requested to reset your password for your DaftarPro account.<br><br>
        To proceed with resetting your password, please click on <a style="text-decoration: underline; font-weight: 600; color: #0098c9;" href=${process.env.MAIL_REDIRECT_LINK}/resetpassword/${token}>Reset Password </a><br><br>
        If you did not request to reset your password, please ignore this email and take the necessary steps to secure your account.<br>
        If the link has expired, please go to login screen and request a new password reset link.<br><br>
        Thank you for choosing DaftarPro. If you have any questions or concerns, please do not hesitate to contact us at.<br>
        Best regards,<br>
        DaftarPro Team </p>`,
      });
      console.log("Reset Password Email sent", info.messageId);
    } catch (error) {
      console.error(error);
    }
  },

  sendRequestStatusEmail: async (email, status, requestType) => {
    let subject = "";
    let message = "";
    if (status === "Approved") {
      subject = "Your request has been approved";
      message = `Dear Employee,<br><br>Your ${requestType} request has been approved. Please check your DaftarPro account for further details.<br><br>Best regards,<br>DaftarPro Team`;
    } else if (status === "Declined") {
      subject = "Your request has been declined";
      message = `Dear Employee,<br><br>Unfortunately, your ${requestType} request has been declined. Please check your DaftarPro account for further details.<br><br>Best regards,<br>DaftarPro Team`;
    } else {
      throw new Error("Invalid status parameter");
    }

    const mailOptions = {
      from: process.env.emailUser, // sender address
      to: email, // list of receivers
      subject: subject,
      text: `Your ${requestType} request has been ${status}`,
      html: message,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Request status email sent to user");
    } catch (error) {
      console.error(error);
    }
  },

  sendRequestNotification: async (emails, requestee) => {
    const message = {
      from: process.env.emailUser,
      to: emails,
      subject: "New Request Notification",
      text: "A new request has been submitted",
      html: `<p>Dear Approver,<br>
        A new request has been submitted on DaftarPro.<br><br>
        Request by: ${requestee}<br><br>
        Please log in to DaftarPro to review and approve the request.<br><br>
        Best regards,<br>
        DaftarPro Team</p>`,
    };
    try {
      await transporter.sendMail(message);
      console.log("Request Notification sent to approvers");
    } catch (error) {
      console.error(error);
    }
  },

  sendVerificationMail: async (email, token) => {
    const mailOptions = {
      from: process.env.emailUser,
      to: email,
      subject: "Verification Mail",
      text: "Email Verification for User",
      html: `<p>Dear Employee,<br>
      Thank you for signing up with DaftarPro! To ensure the security of your account and to verify your email address, we need you to confirm your registration.<br><br>
      To complete your sign-up process, please click on <a style="text-decoration: underline; font-weight: 600; color: #0098c9;" href="${process.env.MAIL_REDIRECT_LINK}/employee-login/${email}&token=${token}">Login</a> <br><br>
      If you are unable to click on the link above, please copy and paste it into your web browser's address bar.<br>
      If you did not sign up for an account with us, please ignore this email.<br><br>
      Thank you for choosing DaftarPro<br>

      Best regards,<br>
  
      DaftarPro Team </p>`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("Verification Email sent to email");
    } catch (error) {
      console.error(error);
    }
  },

  checkPermissions: (
    permissions,
    permissionCatergory,
    permissionSubCategory
  ) => {
    let permissionStatus = false;
    permissions.permissions.map((obj) => {
      if (obj.value === permissionCatergory) {
        obj.subPermissions.map((subObj) => {
          if (subObj.value === permissionSubCategory) {
            permissionStatus = subObj.checked;
            return permissionStatus;
          }
        });
      }
    });
    return permissionStatus;
  },
};

module.exports = methods;
