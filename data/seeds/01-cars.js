// STRETCH

const initialCars = [
  {
    vin: "2HHES35603H002875",
    make: "Honda",
    model: "Civic",
    mileage: 65600,
    title: "clean",
    transmission: "automatic",
  },
  {
    vin: "WUAZZZ8E98N901774",
    make: "Audi",
    model: "R8",
    mileage: 1000,
    title: "clean",
    transmission: "manual",
  },
  {
    vin: "5YJSA2DP8DFP22249",
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
