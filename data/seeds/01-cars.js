// STRETCH

const initialCars = [
  {
    vin: "12345",
    make: "Honda",
    model: "Civic",
    mileage: 65600,
    title: "clean",
    transmission: "automatic",
  },
  {
    vin: "67891",
    make: "Audi",
    model: "R8",
    mileage: 1000,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "25432",
    make: "Tesla",
    model: "Model S Plaid",
    mileage: 5000,
    title: "clean",
    transmission: "automatic",
  },
];

exports.seed = async function (knex) {
  await knex("cars").truncate();
  await knex("cars").insert(initialCars);
};
