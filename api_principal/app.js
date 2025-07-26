const express = require("express");
const morgan = require("morgan");
const contectDB = require("./config/db");
require("dotenv").config();
const { PORT } = process.env;

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
contectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/user"));
//app.use("/api/admin", require("./routes/admin"));
//app.use("/api/products", require("./routes/products"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
