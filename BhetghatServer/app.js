// const express = require("express");
// const cors = require("cors"); // Import CORS middleware
// const connectDb = require("./config/db");
// const UserRouter = require("./routes/userRoute");
// const ProductRouter = require("./routes/ProductRoute");
// const CommunityPostRoute = require("./routes/CommunityPostRoute");
// const AuthRouter = require("./routes/AuthRoute");
// const OrderRouter = require("./routes/OrderRoute");
// const AdminRouter = require("./routes/AdminRoute");
// const AdminRoutes2 = require("./stats/adminStats");
// const cartRoutes = require("./routes/CartRoutes");

// const app = express();

// // Connect to Database
// connectDb();

// // Use CORS Middleware
// // app.use(cors({
// //   origin: ["http://localhost:5173", "http://192.168.1.6"], // Allow frontend and mobile access
// //   credentials: true, // Allow credentials (cookies, authentication headers)
// //   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
// //   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// // }));

// app.use(cors({
//   origin: "http://localhost:5173", // Replace with your React frontend URL
//   credentials: true, // Allow credentials (cookies, authentication headers)
//   methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
// }));


// // Middleware to parse JSON requests
// app.use(express.json());

// const path = require("path");
// app.use("/images", express.static(path.join(__dirname, "images")));

// // Define Routes
// app.use("/api/orders", OrderRouter);
// app.use("/api/user", UserRouter);
// app.use("/api/product", ProductRouter);
// app.use("/api/communityposts", CommunityPostRoute);
// app.use("/api/auth", AuthRouter);
// app.use("/api/admin", AdminRouter);
// app.use("/api/admin2", AdminRoutes2);
// app.use("/api/cart", cartRoutes);

// // Set Server Port and Listen on 0.0.0.0 to Accept External Requests
// // const port = 3000;
// // app.listen(port, "0.0.0.0", () => {
// //   console.log(`Server Running at http://192.168.1.6:${port}`);
// // });


// const port = 3000;
// app.listen(port, "localhost", () => {
//   console.log(`Server Running at http://localhost:${port}`);
// });


// module.exports = app;


const express = require("express");
const cors = require("cors"); // Import CORS middleware
const connectDb = require("./config/db");
const ProductRouter = require("./routes/ProductRoute");
const AuthRouter = require("./routes/AuthRoute");
const OrderRouter = require("./routes/OrderRoute");
const AdminRouter = require("./routes/AdminRoute");
const AdminRoutes2 = require("./stats/adminStats");

const app = express();

// Connect to Database
connectDb();

// Use CORS Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your React frontend URL
  credentials: true, // Allow credentials (cookies, authentication headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Middleware to parse JSON requests
app.use(express.json());

const path = require("path");

app.use("/images", express.static(path.join(__dirname, "images")));


// Define Routes
app.use("/api/orders", OrderRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/admin", AdminRouter);
app.use("/api/admin2", AdminRoutes2)
// Set Server Port
const port = 3000;

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});


module.exports = app;