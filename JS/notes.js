// ########## NOTES ###########
// selectors
const newNoteButton = document.querySelector(".new-note-btn");
const noteModalBg = document.querySelector(".note-modal-bg");
const noteModal = document.querySelector(".note-modal");
const modalClose = document.querySelector(".modal-close");

const noteTitleInput = document.querySelector(".note-title-input");
const noteInput = document.querySelector(".note-input");
const noteSaveButton = document.querySelector(".note-save-btn");
const noteList = document.querySelector(".note-list");
const mainContainer = document.querySelector(".container");

// Event listeners
document.addEventListener("DOMContentLoaded", getNotes);
newNoteButton.addEventListener("click", modalAppear);
modalClose.addEventListener("click", modalDismiss);
noteSaveButton.addEventListener("click", addNote);
noteList.addEventListener("click", editDelete);

// functions
function modalAppear() {
  noteModalBg.classList.add("modal-visible");
  mainContainer.style.filter = "blur(10px)";
  if(!noteModal.classList.contains("edit-modal")){
    noteInput.value = "";
    noteTitleInput.value = "";
  }
}
function modalDismiss() {
  if(noteModal.classList.contains("edit-modal")){
    noteModal.classList.remove("edit-modal");
  }
  noteModalBg.classList.remove("modal-visible");
  mainContainer.style.removeProperty("filter");
}

function addNote(event) {
  event.preventDefault();
  if (!noteModal.classList.contains("edit-modal")) {

    const noteDiv = document.createElement("div");
    // note li
    const newNote = document.createElement("li");

    noteDiv.appendChild(newNote);
    if (noteTitleInput.value === "") {
      newNote.innerText = "Untitled";
    } else {
      newNote.innerText = noteTitleInput.value;
    }
    noteDiv.classList.add("note");
    newNote.classList.add("note-item");

    // Store
    Store(storeNote(newNote.innerText, noteInput.value));
    noteTitleInput.innerText = "";
    noteInput.innerText = "";
    modalDismiss();

    // Edit Button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="material-icons md-36">edit</i>';
    noteDiv.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML =
      '<i class="material-icons md-36">delete_outline</i>';
    noteDiv.appendChild(deleteButton);
    noteList.appendChild(noteDiv);

    noteInput.value = "";
    noteTitleInput.value = "";
  }
}

// edit and delete
function editDelete(e) {
  const item = e.target;
  if (item.classList[0] === "delete-btn") {
    const note = item.parentElement;
    note.classList.add("slideoff");
    // Remove from storage
    note.addEventListener("transitionend", () => {
      note.remove();
    });
    removeNote(note);
  }
  // edit note
  if (item.classList[0] === "edit-btn") {
    noteModal.classList.add("edit-modal");
    const note = item.parentElement;
    editNote(note);
  }
}

// Store function
function Store(noteItem) {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.push(noteItem);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Store note
function storeNote(noteTitle, noteContent) {
  let note = {
    title: noteTitle,
    content: noteContent,
  };
  return note;
}

// UI
function getNotes() {
  let notes;
  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  notes.forEach(function (note) {
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    // note li
    const newNote = document.createElement("li");
    newNote.classList.add("note-item");
    noteDiv.appendChild(newNote);
    newNote.innerText = note.title;
    // Edit Button
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.innerHTML = '<i class="material-icons md-36">edit</i>';
    noteDiv.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.innerHTML =
      '<i class="material-icons md-36">delete_outline</i>';
    noteDiv.appendChild(deleteButton);
    noteList.appendChild(noteDiv);
  });
}

// Remove note
function removeNote(note) {
  let notes;

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  const noteTitle = note.children[0].innerText;
  const noteIndex = notes.find((note) => note.title === noteTitle);
  notes.splice(notes.indexOf(noteIndex), 1);
  localStorage.setItem("notes", JSON.stringify(notes));
}

// edit note
function editNote(note) {
  let notes;

  if (localStorage.getItem("notes") === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem("notes"));
  }
  const noteTitle = note.children[0].innerText;
  console.log(noteTitle);
  let noteItem = notes.find((note) => note.title === noteTitle);

  modalAppear();
  noteTitleInput.value = noteItem.title;
  noteInput.value = noteItem.content;

  let executed = false;
  noteSaveButton.addEventListener("click", () => {
    if (!executed) {
      executed = true;
      noteItem.title = noteTitleInput.value;
      noteItem.content = noteInput.value;
      localStorage.setItem("notes", JSON.stringify(notes));
      note.children[0].innerText = noteItem.title;
      modalDismiss();
    }
  });
}
