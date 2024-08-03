const Car = require("../models/car.model");

exports.createCar = async (req, res) => {
  let { name, year, price } = req.body;
  year = +year;
  price = +price;
  const newCar = new Car({ name, year, price });
  await newCar.save();
  res.status(201).json(newCar);
};

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};

exports.updateCar = async (req, res) => {
  const { id } = req.params;
  const { name, year, price } = req.body;
  const updatedCar = await Car.findByIdAndUpdate(
    id,
    { name, year, price },
    { new: true }
  );
  res.json(updatedCar);
};

exports.deleteCar = async (req, res) => {
  const { id } = req.params;
  await Car.findByIdAndDelete(id);
  res.status(200).end();
};
