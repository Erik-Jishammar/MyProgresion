import { initLogController } from "../controllers/logController.js";

export function renderLogPage(container: HTMLElement): void {
  container.innerHTML = `
    <div class="main-container">
    
      <!-- Left Card: Session/Exercise Form -->
      <section id="form-section" class="card">
        
        <form id="session-form">
          <label for="split">Split/Focus</label>
          <input type="text" id="split" name="split" class="session-input" required placeholder="e.g. Back/Biceps, Lower Body, Full Body" />
          
          <label for="date">Date</label>
          <input type="date" id="date" name="date" class="session-input" required />
          <button type="submit" id="start-session-btn">Start Workout Session</button>
        </form>

        <form id="exercise-form" method="post">
          <label for="name">Exercise</label>
          <input type="text" id="name" name="name" required />

          <div class="form-row">
            <div class="form-group">
              <label for="sets">Sets</label>
              <input type="number" id="sets" name="sets" min="1" max="20" required />
            </div>

            <div class="form-group">
              <label for="reps">Reps</label>
              <input type="number" id="reps" name="reps" min="1" max="100" required />
            </div>

            <div class="form-group">
              <label for="weight">Weight (kg)</label>
              <input type="number" id="weight" name="weight" min="0" step="0.5" />
            </div>
          </div>

          <label for="comment">Comment</label>
          <textarea id="comment" name="comment"></textarea>

          <button type="submit" id="exercise-form-btn">Add Exercise</button>
        </form>
      </section>

      <!-- Right Card: Workout Log -->
      <section id="log-section" class="card">
        <h2 id="log-title">Workout Log</h2>
        <div id="current-session-info"></div>
        <ul id="current-exercises-list"></ul>
        <ul id="log-list"></ul>
        <div class="save-btn-wrapper">
          <button id="save-btn" class="save-btn">Save Session</button>
        </div>
      </section>
    </div>
  `;

  const sessionForm = document.getElementById(
    "session-form"
  ) as HTMLFormElement | null;
  const exerciseForm = document.getElementById(
    "exercise-form"
  ) as HTMLFormElement | null;
  const logList = document.getElementById("log-list") as HTMLElement | null;

  if (sessionForm && exerciseForm) {
    initLogController(sessionForm, exerciseForm, logList);
  }
}
