const express = require("express");
const morgan = require("morgan");

const server = express();
server.use(morgan("combined"));
server.use(express.json());

server.get("/", (req, res) => {
  res.json("Hello World");
});

server.post("/band", (req, res) => {
  res.send(req.body);
});

module.exports = server;
