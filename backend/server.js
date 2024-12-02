// const express = require("express");
// const dotenv = require("dotenv");
// const fileUpload = require("express-fileupload");
// const dbConnection = require("./Database/dbConnection.js");

// const assignmentRoutes = require("./routes/assignmentRoutes.js");
// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());

// // Connect to the database
// dbConnection();

// //routes

// app.use("/api/assignments", assignmentRoutes);
// // Define the port
// const port = process.env.PORT || 5000; // Default to 5000 if PORT is undefined

// // Start the server
// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const dbConnection = require("./Database/dbConnection.js");
const authRoutes = require("./routes/authRoutes.js");
const assignmentRoutes=require("./routes/assignmentRoutes.js")
const adminRoutes=require("./routes/adminRoutes.js")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

dbConnection();

app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/user",assignmentRoutes);
app.use("/api/admin", adminRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
