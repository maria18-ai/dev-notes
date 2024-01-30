// elementos 
const notesContainer = document.querySelector("#notes-container");
const notesInput = document.querySelector("#note-content");
const addNotesBtn = document.querySelector(".add-note");

// funções
function addNote() {
    const noteObject = {
        id: genereteId(),
        content: notesInput.value,
        fixed: false,
    };

    const noteElement = createNote(noteObject.id, noteObject.content);

    notesContainer.appendChild(noteElement);
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

// eventos 
addNotesBtn.addEventListener("click", () => addNote())