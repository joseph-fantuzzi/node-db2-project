const router = require("express").Router();

const Cars = require("./cars-model");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
