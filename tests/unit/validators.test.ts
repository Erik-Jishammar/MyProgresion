import { describe, it, expect } from "vitest";
import { validateExercise } from "../../shared/validators.js";

describe("validateExercise", () => {
  it("validates a correct exercise", () => {
    const exercise = {
      name: "Bench Press",
      sets: 3,
      reps: 10,
      weight: 60,
      comment: "Strong today",
    };
    expect(validateExercise(exercise)).toEqual([]);
  });

  it("requires exercise name to be at least 2 characters", () => {
    const exercise = { name: "A", sets: 3, reps: 10, weight: 50 };
    expect(validateExercise(exercise)).toContain(
      "Exercise name has to be at least 2 characters long"
    );
  });

  it("requires sets to be a positive number", () => {
    const exercise = { name: "Deadlift", sets: 0, reps: 10, weight: 100 };
    expect(validateExercise(exercise)).toContain(
      "Sets has to be a positive number"
    );
  });

  it("requires reps to be a positive number", () => {
    const exercise = { name: "Squats", sets: 3, reps: -5, weight: 80 };
    expect(validateExercise(exercise)).toContain(
      "Reps has to be a positive number"
    );
  });

  it("requires weight to be at least 0", () => {
    const exercise = { name: "Bicep Curls", sets: 3, reps: 12, weight: -10 };
    expect(validateExercise(exercise)).toContain("Weight has to be 0 or greater");
  });

  it("limits comment length", () => {
    const longComment = "a".repeat(201);
    const exercise = {
      name: "Plank",
      sets: 3,
      reps: 1,
      weight: 0,
      comment: longComment,
    };
    expect(validateExercise(exercise)).toContain(
      "Comment has to be less than 200 characters"
    );
  });
});
