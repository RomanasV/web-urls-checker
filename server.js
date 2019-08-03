const express = require("express");
const cors = require("cors");
const request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
const path = require("path");

const linksRouter = require("./routes/links");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/", linksRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
