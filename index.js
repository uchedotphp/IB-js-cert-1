// HTML note template
const noteTemplate = `
    <div class="note">
        <div class="noteHeader">
            <p class="noteIndex">1</p>
        </div>
        <input type="text" placeholder="Add title" />
        <textarea name="" id="" placeholder="Add text"></textarea>
        <div class="noteBtns">
            <button id="delete">Delete</button>
        </div>
    </div>
    `;

// update note count
function updateNoteCount() {
  const totalNotes = document.querySelectorAll(".notesContainer .note").length;
  const notesCountNumContainer = document.querySelector(".notesCountNum");
  notesCountNumContainer.textContent = totalNotes;
}

// Add Note
function addNote() {
  const notesContainer = document.querySelector(".notesContainer");
  if (notesContainer) {
    notesContainer.innerHTML += noteTemplate;
  }
}

const addNoteBtn = document.getElementById("add");
if (addNoteBtn) {
  addNoteBtn.addEventListener("click", () => {
    addNote();
    updateNoteCount();
  });
}

updateNoteCount(); // called once on dom loaded
