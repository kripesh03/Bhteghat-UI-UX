require("dotenv").config();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendVerificationEmail = async (email, username, password, profilePicture, bio, res) => {
  try {
    const token = jwt.sign(
      { username, email, password, profilePicture, bio },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    const mailOptions = {
      from: `"Bhetghat" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm Your Registration",
      html: `
        <p>Click the button below to confirm your registration:</p>
        <form action="http://localhost:5000/api/auth/verify" method="POST">
          <input type="hidden" name="token" value="${token}">
          <button type="submit" 
            style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer;">
            Confirm Registration
          </button>
        </form>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Verification email sent. Please check your inbox." });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};

module.exports = sendVerificationEmail;
