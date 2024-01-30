// elementos 
const notesContainer = document.querySelector("#notes-container");
const notesInput = document.querySelector("#note-content");
const addNotesBtn = document.querySelector(".add-note");

// funções
function showNotes() {
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    });
}


function addNote() {
    const notes = getNotes();

    const noteObject = {
        id: genereteId(),
        content: notesInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes);

    notesInput.value = "";
}

function genereteId() {
    return Math.floor(Math.random() * 5000);
}

function createNote(id, content, fixed) {
    const element = document.createElement("div");
    element.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;

    textarea.placeholder = "Adicione algum texto...";
    element.appendChild(textarea);

    return element;
}

// local storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    return notes;
}

function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

// eventos 
addNotesBtn.addEventListener("click", () => addNote())

// inicialização 
showNotes();