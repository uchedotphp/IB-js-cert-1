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
    const lastNoteIndex =
      (notesContainer.querySelectorAll(".note") &&
        notesContainer.querySelectorAll(".note").length) ||
      0;
    const lastNote =
      (lastNoteIndex &&
        notesContainer.querySelectorAll(".note")[lastNoteIndex - 1]) ||
      null;
    const lastNoteTitle = lastNote && lastNote.querySelector("input");
    // check if the previously added note has a title
    if (lastNote !== null && !lastNoteTitle.value.length) {
      // show error styles on last note
      lastNote.classList.add("error");
      lastNoteTitle.classList.add("input-error");
      setTimeout(() => {
        alert("Please include a title in your last note");
      }, 1);
    } else if (notesContainer) {
      lastNote?.classList?.remove("error");
      lastNoteTitle?.classList?.remove("input-error");
      const lastNoteIndex =
        (notesContainer.querySelectorAll(".note") &&
          notesContainer.querySelectorAll(".note").length) ||
        0;
      const newNoteElement = document.createElement("div");
      newNoteElement.classList.add("note");
      newNoteElement.innerHTML = noteTemplate(lastNoteIndex + 1);
      notesContainer.appendChild(newNoteElement);
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
