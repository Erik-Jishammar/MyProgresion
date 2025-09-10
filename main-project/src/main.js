const form = document.getElementById("log-form"); 
const logList = document.getElementById("log-list"); 

const stats = document.getElementById("stats-container"); 
const passGenerator = document.getElementById("create-pass-generator");

let logData = []; // skapa array/lista
let currentEditId = null;


form.addEventListener("submit", async (event) => {  
    event.preventDefault(); // Hindra sidan från att ladda om

    // Hämta data från formuläret och skapa objekt
    const newExercise = {
        ID: Date.now(), // Unik ID för redigering och borttagning
        datum: form.date.value,
        övning: form.exercise.value,
        set: form.set.value,
        reps: form.reps.value,
        vikt: form.weight.value,
        kommentar: form.comment.value
    };
    if (currentEditId) {
        // sätta i "edit-läge" -> med find metod hitta rätt ID och köra en PUT(fetch) 
        // Else "nytt läge" - POST fetch (lägga in funktioner för anrop?)
    }
    
    try {
        const result = await fetch("http://127.0.0.1:3000/form", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newExercise)
        });

        const responseData = await result.json(); // läs svaret från express-servern
        console.log("Nytt pass sparat:", responseData);

        logData.push(newExercise);
        renderLogList();

        // Nollställ formuläret
        form.reset();
    } catch (error) {
        console.error(error);
    }
});

// Funktion för att rendera lista
function renderLogList() {
    logList.innerHTML = ""; // Tömmer listan
    console.log("Alla pass sparade:", logData);

    logData.forEach(exercise => {
        const li = document.createElement("li"); // Skapa <li> för varje övning/pass
        li.textContent = `${exercise.datum} - ${exercise.övning} (${exercise.set}x${exercise.reps}) - ${exercise.vikt}kg${exercise.kommentar ? ": " + exercise.kommentar : ""}`;
        
        // Här kan du senare lägga till edit- och delete-knappar
        logList.appendChild(li);
    });
}
    /*
    const editBtn = document.createElement('button'); 
    editBtn.textContent = "<i class="fa-solid fa-pen"></i>";
    
    editBtn.addEventListener('click', () =>{

    });
 */


// const removeBtn = document.createElement("button"); 
// removeBtn.innerText = "X"; 
// filter ID? -> För att hitta den övningen som ska tas bort
// removeBtn.addEventListener("click", () => {
//  logik
