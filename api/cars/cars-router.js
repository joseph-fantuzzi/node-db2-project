const router = require("express").Router();

const Cars = require("./cars-model");

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.status(200).json(cars);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", checkCarId, (req, res) => {
  res.status(200).json(req.car);
});

router.post(
  "/",
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await Cars.create(req.newCar);
      res.status(201).json(newCar);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
