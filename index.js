document.addEventListener("DOMContentLoaded", () => {
  // HTML note template
  const noteTemplate = (noteNumber) => `
        <div class="note">
            <div class="noteHeader">
                <p class="noteIndex">${noteNumber}</p>
            </div>
            <input type="text" placeholder="Add title" />
            <textarea name="" id="" placeholder="Add text"></textarea>
            <div class="noteBtns">
                <button id="delete">Delete</button>
            </div>
        </div>
        `;

  const notesContainer = document.querySelector(".notesContainer");
  const addNoteBtn = document.getElementById("add");
  
  // Add Note
  function addNote() {
    if (notesContainer) {
      const lastNoteIndex =
        (notesContainer.querySelectorAll(".note") &&
          notesContainer.querySelectorAll(".note").length) ||
        0;
      notesContainer.innerHTML += noteTemplate(lastNoteIndex + 1);
    }
  }

  // update note count
  function updateNoteCount() {
    const totalNotes = notesContainer.querySelectorAll(".note").length;
    const notesCountNumContainer = document.querySelector(".notesCountNum");
    notesCountNumContainer.textContent = totalNotes;
  }

  // Delete a note
  function deleteNote(note) {
    note.remove();
    // Get all remaining notes
    const notesLeft = notesContainer.querySelectorAll(".note");
    // Reorder the note numbers
    notesLeft.forEach((note, index) => {
      note.querySelector(".noteIndex").textContent = index + 1;
    });
    updateNoteCount();
  }

  // Event listeners
  addNoteBtn &&
    addNoteBtn.addEventListener("click", () => {
      addNote();
      updateNoteCount();
    });

  notesContainer.addEventListener("click", (event) => {
    // Deleting a note
    if (event.target.id === "delete") {
      const noteToDelete = event.target.closest(".note");
      deleteNote(noteToDelete);
    }
  });

  updateNoteCount(); // called once on dom loaded
});
