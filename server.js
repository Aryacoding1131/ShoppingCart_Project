import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import session from "express-session";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

// ------------------- DB CONNECTION --------------------
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const app = express();

// ------------------- MIDDLEWARE ------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Login Required Middleware
function requireLogin(req, res, next) {
  if (!req.session.user) return res.redirect("/login");
  next();
}

// ------------------- ROUTES ----------------------------

// Login Page
app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/public/login.html");
});

app.get("/login", (req, res) => {
  res.sendFile(process.cwd() + "/public/login.html");
});

// ---------------- LOGIN POST ----------------
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    return res.redirect("/login?error=UserNotFound");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.redirect("/login?error=WrongPassword");
  }

  req.session.user = username;
  res.redirect("/dashboard");
});

// ---------------- SIGNUP PAGE ----------------
app.get("/signup", (req, res) => {
  res.sendFile(process.cwd() + "/public/signup.html");
});

// ---------------- SIGNUP POST (With Validation) ----------------
app.post("/signup", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // 1️⃣ Check if username exists
  const exists = await User.findOne({ username });
  if (exists) {
    return res.redirect("/signup?error=UserExists");
  }

  // 2️⃣ Confirm password check
  if (password !== confirmPassword) {
    return res.redirect("/signup?error=PasswordMismatch");
  }

  // 3️⃣ Strong password validation
  const strongPassword =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[^A-Za-z0-9]/.test(password);

  if (!strongPassword) {
    return res.redirect("/signup?error=WeakPassword");
  }

  // 4️⃣ Hash password
  const hashed = await bcrypt.hash(password, 10);

  // 5️⃣ Save user
  await User.create({
    username,
    password: hashed,
    items: [],
    billingAmount: 0
  });

  res.redirect("/login?success=AccountCreated");
});

// ------------------- DASHBOARD -------------------------
app.get("/dashboard", requireLogin, (req, res) => {
  res.sendFile(process.cwd() + "/public/dashboard.html");
});

// ------------------- USER INFO API -----------------------
app.get("/user", requireLogin, (req, res) => {
  res.json({ username: req.session.user });
});

// ----------------- ADD TO CART -------------------------
app.post("/addtocart", requireLogin, async (req, res) => {
  const { name, price, quantity } = req.body;

  const user = await User.findOne({ username: req.session.user });

  user.items.push({
    name,
    price: Number(price),
    quantity: Number(quantity)
  });

  user.billingAmount += Number(price) * Number(quantity);

  await user.save();

  res.redirect("/dashboard?added=1");
});

// ----------------- VIEW CART PAGE ----------------------
app.get("/cart", requireLogin, (req, res) => {
  res.sendFile(process.cwd() + "/public/cart.html");
});

// ----------------- CART JSON API ------------------------
app.get("/cartdata", requireLogin, async (req, res) => {
  const user = await User.findOne({ username: req.session.user });

  res.json({
    items: user.items,
    billingAmount: user.billingAmount
  });
});

// ----------------- RESET CART ---------------------------
app.post("/resetcart", requireLogin, async (req, res) => {
  await User.updateOne(
    { username: req.session.user },
    { $set: { items: [], billingAmount: 0 } }
  );

  res.redirect("/cart");
});

// ---------------- PAYMENT PAGE ---------------------------
app.get("/payment", requireLogin, (req, res) => {
  res.sendFile(process.cwd() + "/public/payment.html");
});

// ---------------- LOGOUT (GET + POST) --------------------
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

app.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

// ---------------- START SERVER ---------------------------
app.listen(5000, () => console.log("Server running at 5000"));
