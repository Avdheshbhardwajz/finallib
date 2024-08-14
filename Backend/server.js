const express = require("express");

const app = express();
const connection = require("./config/connection");
const logger = require("./utils/logger");
const user = require("./routes/login.route");
const book = require("./routes/book.route");
app.use(express.json());
app.use(logger);

require("dotenv").config();

app.get("/", (req, res) => {
  res.status(200).send("Server is running fine");
});

const PORT = process.env.PORT;

app.use("/api/auth", user);
app.use("/api/books", book);

app.listen(PORT, async () => {
  try {
    await connection;
    console.log(`database is connected succesfuly to the port`, PORT);
  } catch (error) {
    console.log("there is something wrong in the server", error);
  }
});
