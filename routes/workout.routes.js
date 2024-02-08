import { Router } from "express";
import {
  createWorkout, // CREATE
  deleteWorkout, // DELETE
  getWorkout, // READ
  getWorkouts, // READ
  updateWorkout, // UPDATE
} from "../controllers/workout.controllers.js";

export const router = Router();

// GET all workouts
router.get("/", getWorkouts);

// GET single workout
router.get("/:id", getWorkout);

// POST new workout
router.post("/", createWorkout);

// DELETE new workout
router.delete("/:id", deleteWorkout);

// PATCH new workout
router.patch("/:id", updateWorkout);
