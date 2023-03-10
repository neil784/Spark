const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Project = require("../models/project");
const mongoose = require("mongoose");

// Get all users (testing purposes)
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", data: users });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Delete user (testing purposes)
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User does not exist", data: {} });
    }
    await user.remove();
    return res.status(200).json({ message: "User deleted", data: {} });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get user by email
// query: {email}
router.get("/getUser", async (req, res) => {
  try {
    if (req.query.email == null) {
      return res.status(400).json({ message: "Email must be in query params" });
    }
    const user = await User.find({ email: req.query.email });
    if (user.length == 0) {
      return res
        .status(200)
        .json({ message: "Email does not exist", data: {} });
    } else {
      return res.status(200).json({ message: "Success", data: user[0] });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get Applications
// query: {userId}
router.get("/applications", async (req, res) => {
  try {
    if (req.query.userId == null) {
      return res
        .status(400)
        .json({ message: "userId must be in query params" });
    }
    const user = await User.findById(req.query.userId);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user", data: {} });
    }
    return res.status(200).json({ message: "OK", data: user.applications });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Create user
// body: {name, username, email, password, bio, [skills]}
router.post("/create", async (req, res) => {
  try {
    // Check if email already exists
    const checkEmail = await User.find({ email: req.body.email });
    if (checkEmail.length != 0) {
      return res
        .status(400)
        .json({ message: "Error: email already exists", data: {} });
    }

    const user = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      location: req.body.location,
      experience: req.body.experience,
      number: req.body.number,
      bio: req.body.bio,
      skills: req.body.skills,
      projects: [],
      applications: [],
    });

    await user.save();
    return res.status(201).json({ message: "User created", data: user });
  } catch {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Get user info
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user", data: {} });
    }
    return res.status(200).json({ message: "OK", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

// Change user info
// body: {field, content}
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (req.body.field == "name") {
      user.name = req.body.content;
    }
    if (req.body.field == "username") {
      user.username = req.body.content;
    }
    if (req.body.field == "bio") {
      user.bio = req.body.content;
    }
    if (req.body.field == "skills") {
      user.skills = req.body.content;
    }
    return res.status(200).json({ message: "OK", data: user });
  } catch (err) {
    return res.status(500).json({ message: err.message, data: {} });
  }
});

module.exports = router;
