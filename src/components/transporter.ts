import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "atmajoc@gmail.com",
    pass: "whjp tdse mxwl zogf",
  },
});

export default transporter;
