import nodemailer from "nodemailer";
import sgMail from "@sendgrid/mail";


if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmail = async (to, subject, html) => {
  try {
    if (process.env.SENDGRID_API_KEY) {
      const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL || process.env.GMAIL_USERNAME,
        subject,
        html,
      };
      
      const response = await sgMail.send(msg);
      console.log("Email sent via SendGrid:", response[0].statusCode);
      return { success: true, service: "SendGrid" };
    }
    if (process.env.GMAIL_USERNAME && process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USERNAME,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to,
        subject,
        html,
      };

      const info = await transporter.sendMail(mailOptions);
      console.log("Email sent via Gmail:", info.response);
      return { success: true, service: "Gmail" };
    }
    
    throw new Error("No email service configured");
  } catch (error) {
    console.error("Email sending error:", error);
    console.error("Environment variables check:");
    console.error("SENDGRID_API_KEY:", process.env.SENDGRID_API_KEY ? "Set" : "Not set");
    console.error("GMAIL_USERNAME:", process.env.GMAIL_USERNAME ? "Set" : "Not set");
    console.error("GMAIL_APP_PASSWORD:", process.env.GMAIL_APP_PASSWORD ? "Set" : "Not set");
    throw error;
  }
}; 