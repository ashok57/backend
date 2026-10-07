const express = require("express");
const router = require("./Routes/authRouter");
const dbConnect = require("./db/dbConnect");

const app = express();
dbConnect();

const port = 5000;

app.use(express.json());
app.use("/api/v1", router);

app.listen(port, () => {
  return `app liten in the port ${port}`;
});
