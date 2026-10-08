require("dotenv").config();
const express = require("express");
const router = require("./Routes/authRouter");
const noteRoute = require("./Routes/notesRoutes");
const dbConnect = require("./db/dbConnect");

const dotenv = require("dotenv");
dotenv.config();

const app = express();
dbConnect();

const port = process.env.port || 5000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is working");
});
app.use("/api/v1", router);
app.use("/api/", noteRoute);

app.listen(port, () => {
  return `app liten in the port ${port}`;
});
