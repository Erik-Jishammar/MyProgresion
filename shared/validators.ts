import type { Exercise } from "./types.js";

export function validateExercise(exercise: Exercise): string[] {
  const errors: string[] = [];

  if (!exercise.name || exercise.name.length < 2) {
    errors.push("Exercise name has to be at least 2 characters long");
  }

  if (!exercise.sets || exercise.sets <= 0) {
    errors.push("Sets has to be a positive number");
  }

  if (!exercise.reps || exercise.reps <= 0) {
    errors.push("Reps has to be a positive number");
  }

  if (exercise.weight < 0) {
    errors.push("Weight has to be 0 or greater");
  }

  if (exercise.comment && exercise.comment.length > 200) {
    errors.push("Comment has to be less than 200 characters");
  }

  return errors;
}

export function validateAuth(data: { email?: string; password?: string }): string[] {
  const errors: string[] = [];

  if (!data.email || !data.email.includes("@")) {
    errors.push("Invalid email address");
  }

  if (!data.password || data.password.length < 8) {
    errors.push("Password has to be at least 8 characters long");
  }

  return errors;
}
