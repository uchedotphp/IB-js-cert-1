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
  // const notesWithoutTitle = []; // keeps track of notes without titles

  // Add Note
  function addNote() {
    const allNotes = notesContainer.querySelectorAll(".note");
    const notesWithoutTitle = []; // keeps track of notes without titles

    allNotes.forEach((note) => {
      const titleInput = note.querySelector("input");
      if (!titleInput.value.trim().length) {
        notesWithoutTitle.push(note); // store the note if the title is missing
      }
    });

    // check if the previously added notes have a title
    if (notesWithoutTitle.length) {
      notesWithoutTitle.forEach((note) => {
        // show error styles on notes with missing titles
        toggleErrorClassToNote({ note, type: "add" });
      });
      // setTimeout(() => {
      //   alert("Please include a title in your last note");
      // }, 2);
    } else if (notesContainer) {
      notesContainer.querySelectorAll(".note").length &&
        notesContainer.querySelectorAll(".note").forEach((note) => {
          // Remove error classes from any note with one
          toggleErrorClassToNote({ note, type: "remove" });
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

  function toggleErrorClassToNote({ note, type }) {
    switch (type) {
      case "add":
        note && note.classList.add("error");
        note && note.querySelector("input").classList.add("input-error");
        break;

      case "remove":
        note && note.classList.remove("error");
        note && note.querySelector("input").classList.remove("input-error");

      default:
        // Do nothing
        break;
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

      // Handle alphabetical sorting with empty titles coming last
      if (sortOptions === "title-asc" || sortOptions === "title-desc") {
        if (!titleA && !titleB) return 0; // Both titles are empty, maintain original order
        if (!titleA) return 1; // a has an empty title, so it should go after b
        if (!titleB) return -1; // b has an empty title, so it should go after a

        if (sortOptions === "title-asc") {
          return titleA.localeCompare(titleB); // a-z sorting
        } else if (sortOptions === "title-desc") {
          return titleB.localeCompare(titleA); // z-a sorting
        }
      }

      switch (sortOptions) {
        case "id-desc":
          return idB - idA;
        case "id-asc":
          return idA - idB;
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
