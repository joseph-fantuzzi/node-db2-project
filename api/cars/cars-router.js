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

router.get("/:id", async (req, res, next) => {
  try {
    const car = await Cars.getById(req.params.id);
    res.status(200).json(car);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newCar = await Cars.create(req.body);
    res.status(201).json(newCar);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
