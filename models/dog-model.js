// models/dogModel.js
const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
    name: String,
    age: String,
    vaccinations: String,
    size: String,
    traits: [String],
    price: String,
    imageUrl: String
});

const Dog = mongoose.model("Dog", dogSchema);
module.exports = Dog;
