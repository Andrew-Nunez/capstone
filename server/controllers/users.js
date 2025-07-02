
import { Router } from  "express";
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


export default router;
