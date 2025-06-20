require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Credential = require("../model/Credentials");

// Use environment variables
const SECRET_KEY = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// ✅ Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Send Verification Email
const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:3000/api/auth/verify?token=${token}`;

  const mailOptions = {
    from: `"SonicSummit" <${EMAIL_USER}>`,
    to: email,
    subject: "Confirm Your Registration",
    html: `
      <p>Click the button below to confirm your registration:</p>
      <a href="${verificationLink}" 
         style="display:inline-block;padding:10px 20px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
         Confirm Registration
      </a>
      <p>If you did not request this, please ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ Register User (Sends Verification Email)
const register = async (req, res) => {
  try {
    const { username, email, password, profilePicture, bio } = req.body;

    // Check for existing user
    const existingUser = await Credential.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Create token with user details (valid for 1 hour)
    const token = jwt.sign(
      { username, email, password, profilePicture, bio },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    // Send verification email
    await sendVerificationEmail(email, token);

    res.status(200).json({ message: "Verification email sent. Please check your inbox." });
  } catch (error) {
    res.status(500).json({ message: "Error during registration", error: error.message });
  }
};

// ✅ Verify & Save User when clicking the email link
const verifyUser = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Decode token
    const decoded = jwt.verify(token, SECRET_KEY);
    const { username, email, password, profilePicture, bio } = decoded;

    // Check if already verified
    const existingUser = await Credential.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already verified or registered" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Credential({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      bio: bio || "",
    });

    await newUser.save();

    // Redirect to verification success page
    res.redirect("http://localhost:5173/verify-success");
  } catch (error) {
    res.status(400).json({ message: "Verification failed", error: error.message });
  }
};

// ✅ Login User
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user
    const cred = await Credential.findOne({ username });
    if (!cred) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, cred.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid username or password" });
    }

    // Generate token
    const token = jwt.sign({ username: cred.username }, SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({ message: "Login successful", token, userId: cred._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

// ✅ Upload profile picture (handled by multer)
const uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.filename;

    res.json({ message: "Image uploaded successfully", data: filePath });
  } catch (error) {
    res.status(500).json({ message: "Error uploading image", error: error.message });
  }
};

// ✅ Get User By ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await Credential.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

module.exports = {
  register,
  verifyUser,
  login,
  uploadProfilePicture,
  getUserById,
};
