const Cars = require("./cars-model");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ message: `car with id ${id} is not found` });
    }
  } catch (err) {
    next(err);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage, title, transmission } = req.body;
  const error = { status: 400 };
  if (!vin) {
    error.message = "vin is missing";
  } else if (!make) {
    error.message = "make is missing";
  } else if (!model) {
    error.message = "model is missing";
  } else if (!mileage) {
    error.message = "mileage is missing";
  }

  if (error.message) {
    next(error);
  } else {
    req.newCar = {
      vin,
      make,
      model,
      mileage,
      title,
      transmission,
    };
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  next();
};

const checkVinNumberUnique = (req, res, next) => {
  next();
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
