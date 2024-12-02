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
