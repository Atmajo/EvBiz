import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "coleman68@ethereal.email",
        pass: "GkfdPrBnktHu3nPj4P",
    },
});

export default transporter;