const express = require("express");

const CarsRouter = require("./cars/cars-router");

const server = express();

server.use(express.json());

server.use("/api/cars", CarsRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
