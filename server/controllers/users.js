import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.post("/", async (request, response) => {
  try {
    const newUser = new User(request.body);
    const savedUser = await newUser.save();
    response.json(savedUser);
  } catch (error) {
    console.error(error);
    response.status(400).json({ message: "Error saving user data" });
  }
});

// Get all pizzas route
router.get("/", async (request, response) => {
  try {
    // Store the query params into a JavaScript Object
    const query = request.query; // Defaults to an empty object {}
    const data = await User.find(query);
    response.json(data);
  } catch (error) {
    // Output error to the console incase it fails to send in response
    console.log(error);
    return response.status(500).json(error.errors);
  }
});

export default router;
