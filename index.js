document.addEventListener("DOMContentLoaded", () => {
  // HTML note template
  const noteTemplate = (noteNumber) => `
            <div class="noteHeader">
                <p class="noteIndex">${noteNumber}</p>
            </div>
            <input type="text" placeholder="Add title" />
            <textarea name="" id="" placeholder="Add text"></textarea>
            <div class="noteBtns">
                <button id="delete">Delete</button>
            </div>
        `;

  const notesContainer = document.querySelector(".notesContainer");
  const addNoteBtn = document.getElementById("add");
  const sortBtn = document.getElementById("sort");
  const sortOptions = document.getElementById("sort-by");

  // Add Note
  function addNote() {
    // check if the previously added note has a title
    const allNotes = notesContainer.querySelectorAll(".note");
    const notesWithoutTitle = [];

    allNotes.forEach((note) => {
      const titleInput = note.querySelector("input");
      if (!titleInput.value.trim()) {
        notesWithoutTitle.push(note); // store the note if the title is missing
      }
    });
    if (notesWithoutTitle.length) {
      // show error styles on notes with missing titles
      notesWithoutTitle.forEach((note) => {
        note.classList.add("error");
        note && note.querySelector("input").classList.add("input-error");
      });
      setTimeout(() => {
        alert("Please include a title in your last note");
      }, 2);
    } else if (notesContainer) {
      notesContainer.querySelectorAll(".note").length && notesContainer.querySelectorAll(".note").forEach((note) => {
        note.classList.remove("error");
        note && note.querySelector("input").classList.remove("input-error");
      });

      // Create new note element with note number 1
      const newNoteElement = document.createElement("div");
      newNoteElement.classList.add("note");
      newNoteElement.innerHTML = noteTemplate(1);

      // Prepend the new note to the top of the notes container
      notesContainer.insertBefore(newNoteElement, notesContainer.firstChild);

      // Reorder the existing notes
      const notes = notesContainer.querySelectorAll(".note");
      notes.forEach((note, index) => {
        note.querySelector(".noteIndex").textContent = index + 1;
      });

      updateNoteCount();
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

  // Sort Notes
  function sortNotes(sortOptions) {
    const notes = Array.from(notesContainer.querySelectorAll(".note"));

    notes.sort((a, b) => {
      const idA = parseInt(a.querySelector(".noteIndex").textContent);
      const idB = parseInt(b.querySelector(".noteIndex").textContent);
      const titleA = a.querySelector("input").value.toLowerCase();
      const titleB = b.querySelector("input").value.toLowerCase();

      switch (sortOptions) {
        case "id-desc":
          return idB - idA;
        case "id-asc":
          return idA - idB;
        case "title-asc":
          return titleA.localeCompare(titleB);
        case "title-desc":
          return titleB.localeCompare(titleA);
        default:
          return 0;
      }
    });

    // Clear the notes container and re-append the sorted notes
    notesContainer.innerHTML = "";
    notes.forEach((note) => notesContainer.appendChild(note));
  }

  // Event listeners
  addNoteBtn &&
    addNoteBtn.addEventListener("click", () => {
      addNote();
      updateNoteCount();
    });

  sortBtn &&
    sortBtn.addEventListener("click", () => sortNotes(sortOptions.value));

  notesContainer.addEventListener("click", (event) => {
    // Deleting a note
    if (event.target.id === "delete") {
      const noteToDelete = event.target.closest(".note");
      deleteNote(noteToDelete);
    }
  });

  updateNoteCount(); // called once on dom loaded
});
