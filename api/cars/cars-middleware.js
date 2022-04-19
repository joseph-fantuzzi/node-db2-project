const Cars = require("./cars-model");
const db = require("../../data/db-config");

const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const car = await Cars.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ status: 404, message: `car with id ${id} is not found` });
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
  const { vin } = req.newCar;
  const isValidVin = vinValidator.validate(vin);
  if (isValidVin) {
    next();
  } else {
    next({ status: 400, message: `vin ${vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    const { vin } = req.newCar;
    const car = await db("cars").where("vin", vin).first();
    if (car) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
