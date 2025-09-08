/* Funktioner beskrivning
* Variabler för att hämta html elementen
* Hämta data från formuläret -> objekt
* Funktion för att lägga till pass -> array

* eventlistener på submit btn  -> JS skickar POST till backend(sparar i databas -senare)
* Backend returnerar passet/övningen -> JS renderar passet i "log-list" 
* Redigera befintligt pass edit knapp på varje lista
* Kunna ta bort pass - delete knapp -> uppdatera vyn direkt (fetch+ DOM manipulation)

<- Utveckling längre fram ->
* Integrera AI för att skapa pass? 
* Statistik som visar den viktigaste träningsdatan? Hur ska jag gå tillväga? 
* Människokropp som visar vilka muskler man tränar vid en viss övning?
* Att senare få förslag på övningar eller muskelgrupper man inte tränat på ett tag? 


*/
const form = document.getElementById("log-form"); 
const logList = document.getElementById("log-list"); 

const stats = document.getElementById("stats-container"); 
const passGenerator = document.getElementById("create-pass-generator")

const submitBtn = document.getElementById("form-submit"); 

let logData =[]; // skapa array/lista

submitBtn.addEventListener("submit",() => {
    // hämta data från formuläret
// TYPEA?
 const newExercise = {
      ID: Date.now(), // Unik ID för redigering och borttagning
      datum: form.date.value,
      övning: form.exercise.value,
      set: form.set.value,
      reps: form.reps.value,
      vikt: form.weight.value,
      kommentar:form.comment.value
 }

      logData.push(newExercise)

      renderlogList(); // Rendera lista
        form.reset() // "Reset" av formuläret
    })
    // Funktion för att rendera lista
    function renderLogList(){
        logList.innerHTML=""; // Töm lista
        
        logData.forEach(exercise => {
        const li = document.createElement("li"); // Loop för att gå genom listan och sedan skapa ett <li> för varje övning/pass
            li.textContent = ' §(exercise.datum) - §(exercise.övning)'
    })};

        

// const editBtn = document.createElement("button");  
// editBtn.innerText = edit-icon? 
// Koppla ihop/sök efter unikt ID

// editBtn.addEventListener("click", () => {
//    logik )}



// const removeBtn = document.createElement("button"); 
// removeBtn.innerText = "X" ; 
// filter ID? -> För att hitta den övningen som ska tas bort
// removeBtn.addEventListener("click" () => {
//  logik