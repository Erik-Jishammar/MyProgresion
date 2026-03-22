import { test, expect } from "@playwright/test";

test("user can add session and exercise", async ({ page }) => {
  await page.goto("http://localhost:5173");

  await page.fill("#split", "bröst/triceps");
  await page.fill("#date", "2025-10-08");
  await page.click("#start-session-btn");

  await page.fill("#exercise", "bänkpress");
  await page.fill("#set", "3");
  await page.fill("#reps", "12");
  await page.fill("#weight", "100");
  await page.fill("#comment", "Det kändes bra");

  await page.click("#exercise-form-btn");

  const newExercise = page.locator("#current-exercises-list li", {
    hasText: "bänkpress",
  });
  await expect(newExercise).toBeVisible();
});

// Testa för edit knapp + deleteknapp?
// Testa save knapp?
