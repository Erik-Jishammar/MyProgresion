export function initLogController(sessionForm, logForm, logList) {
  let logData = [];
  let currentEditId = null;
  let currentSession = null;

  logForm.querySelectorAll("input, button").forEach(el => el.disabled = true);

  const sessionInfoDiv = document.getElementById("current-session-info");

  fetchExercises();

  sessionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    currentSession = {
      _id: null, // sätts när vi sparar
      split: sessionForm.split.value,
      date: sessionForm.date.value,
      exercises: [],
    };

    sessionForm.reset();
    logForm.querySelectorAll("input, button").forEach(el => el.disabled = false);
    renderCurrentExercises();
  })

  logForm.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      logForm.requestSubmit();
    }
  });

  logForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!currentSession) return;

    const newExercise = {
      övning: logForm.exercise.value,
      set: logForm.set.value,
      reps: logForm.reps.value,
      vikt: logForm.weight.value,
      kommentar: logForm.comment.value,
    };

    if (currentEditId) {
      currentSession.exercises = currentSession.exercises.map(ex =>
        ex._id === currentEditId ? { ...ex, ...newExercise } : ex
      );
      currentEditId = null;
    } else {
      currentSession.exercises.push(newExercise);
    }

    renderCurrentExercises();
    logForm.reset();
  });

  const saveBtn = document.getElementById("save-btn");
  saveBtn.addEventListener("click", async () => {
    if (!currentSession || currentSession.exercises.length === 0) {
      alert("Inga övningar att spara! Lägg till minst en övning först.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentSession),
      });
      const data = await res.json();

      currentSession._id = data.exercise._id;
      logData.push(data.exercise);

      alert("Passet sparat!");
      currentSession = null;
      logForm.querySelectorAll("input, button").forEach(el => el.disabled = true);
      renderCurrentExercises();
      renderLogList();
    } catch (error) {
      console.error("Kunde inte spara pass:", error);
    }
  });

  async function fetchExercises() {
    try {
      const res = await fetch("http://localhost:3000/exercises");
      if (res.ok) {
        logData = await res.json();
        renderLogList();
      }
    } catch (error) {
      console.error("Kunde inte hämta övningar:", error);
    }
  }

  function renderCurrentExercises() {
    const sessionInfoDiv = document.getElementById("current-session-info");
    const ul = document.getElementById("current-exercises-list");
    ul.innerHTML = "";

    if (!currentSession) {
      sessionInfoDiv.textContent = "";
      return;
    }

    sessionInfoDiv.textContent = `${currentSession.split} - ${currentSession.date}`;

    currentSession.exercises.forEach((exercise) => {
      const li = document.createElement("li");
      li.textContent = `${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;

      const actions = document.createElement("div");
      actions.classList.add("log-actions");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
      editBtn.addEventListener("click", () => {
        currentEditId = exercise._id;
        logForm.exercise.value = exercise.övning;
        logForm.set.value = exercise.set;
        logForm.reps.value = exercise.reps;
        logForm.weight.value = exercise.vikt;
        logForm.comment.value = exercise.kommentar || "";
      });

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
      deleteBtn.addEventListener("click", () => {
        currentSession.exercises = currentSession.exercises.filter(ex => ex._id !== exercise._id);
        renderCurrentExercises();
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);
      li.appendChild(actions);
      ul.appendChild(li);
    });
  }

  function renderLogList() {
    if (!logList) return;
    logList.innerHTML = "";

    logData.forEach((session) => {
      session.exercises.forEach((exercise) => {
        const li = document.createElement("li");
        li.textContent = `${session.date || "okänt datum"} - ${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;

        const actions = document.createElement("div");
        actions.classList.add("log-actions");

        const editBtn = document.createElement("button");
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.addEventListener("click", () => {
          currentEditId = exercise._id;
          logForm.exercise.value = exercise.övning;
          logForm.set.value = exercise.set;
          logForm.reps.value = exercise.reps;
          logForm.weight.value = exercise.vikt;
          logForm.comment.value = exercise.kommentar || "";
        });

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.addEventListener("click", async () => {
          try {
            await fetch(`http://localhost:3000/exercises/${exercise._id}`, { method: "DELETE" });
            logData = logData.filter(s => s._id !== session._id);
            renderLogList();
          } catch (err) {
            console.error("Kunde inte radera övning:", err);
          }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);
        li.appendChild(actions);
        logList.appendChild(li);
      });
    });
  }
}