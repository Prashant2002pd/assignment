const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connect = require("./connection/db");
const router = require("./routes/routes");
const app = express();
const port = process.env.PORT || 3000;
connect;
app.use(express.json());
app.use(cors());
app.use("/api/v1", router);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
