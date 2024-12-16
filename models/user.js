const mongoose = require("mongoose");

// Schema untuk User
const UserSchema = mongoose.Schema({
  id_auth: {
    type: String,
    required: true,
    trim: true,
  }, // Nama Depan
  firstName: {
    type: String,
    required: true,
    trim: true,
  }, // Nama Depan
  lastName: {
    type: String,
    required: true,
    trim: true,
  }, // Nama Belakang
  dateOfBirth: {
    type: Date,
    required: true,
  }, // Tanggal Lahir
  role: {
    type: String,
    enum: ["Penjual", "Pembeli"],
    required: true,
  }, // Role
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }, // Email
  createdAt: {
    type: Date,
    default: Date.now,
  }, // Tanggal Pembuatan Data
});

module.exports = mongoose.model("User", UserSchema);
