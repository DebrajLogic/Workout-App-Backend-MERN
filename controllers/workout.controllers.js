import mongoose from "mongoose";
import { Workout } from "../models/workout.models.js";

// GET all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json({ response: workouts });
  } catch (error) {
    console.log("Error fetching workouts", error.message);
  }
};

// GET single workout
export const getWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Not valid ID" });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return res
        .status(404)
        .json({ error: `Not Workout with id: ${id} Found` });
    }
    res.status(200).json({ response: workout });
  } catch (error) {
    console.log("error", error);
  }
};

// POST new workout
export const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const workout = await Workout.create({
      title,
      reps,
      load,
    });
    console.log("Workout Posted!", workout);
    res.status(200).json({ message: "Workout Posted!", response: workout });
  } catch (error) {
    console.log("Error Creating Workout !!!");
    res
      .status(400)
      .json({ message: "Error Creating Workout !!!", response: error.message });
  }
};

// DELETE new workout
export const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "not a valid Id" });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    res.status(404).json({ response: `No workout with id: {id} found` });
  }

  res.status(200).json({
    response: workout,
    message: "Workout Deleted Successfully",
  });
};

// PATCH new workout
export const updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Not Valid Id" });
    }
    const workout = await Workout.findByIdAndUpdate(
      { _id: id },
      { ...req.body }
    );

    if (!workout) {
      res.status(404).json({ response: "No such workout found" });
    }
    res
      .status(200)
      .json({ response: workout, message: "workout updated succesfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to update workout !!!" });
  }
};
