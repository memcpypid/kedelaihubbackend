const express = require("express");
const router = express.Router();
const User = require("../models/user");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET user by id_auth
router.get("/:id_auth", async (req, res) => {
  try {
    const user = await User.findOne({ id_auth: req.params.id_auth });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post("/", async (req, res) => {
  const { id_auth, firstName, lastName, dateOfBirth, role, email } = req.body;

  const newUser = new User({
    id_auth,
    firstName,
    lastName,
    dateOfBirth,
    role,
    email,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// UPDATE user by id_auth
router.put("/:id_auth", async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { id_auth: req.params.id_auth }, // Cari berdasarkan id_auth
      { $set: req.body }, // Perbarui dengan data baru dari req.body
      { new: true, runValidators: true } // Kembalikan data yang diperbarui & validasi data
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // Kirimkan user yang diperbarui
  } catch (err) {
    res.status(400).json({ message: err.message }); // Kesalahan saat validasi atau lainnya
  }
});

// DELETE user by id_auth
router.delete("/:id_auth", async (req, res) => {
  try {
    const deletedUser = await User.findOneAndDelete({
      id_auth: req.params.id_auth,
    });
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
