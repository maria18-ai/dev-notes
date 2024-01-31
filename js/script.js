// ELEMENTS 
const notesContainer = document.querySelector("#notes-container");
const notesInput = document.querySelector("#note-content");
const addNotesBtn = document.querySelector(".add-note");
const searchInput = document.querySelector("#search-input");
const exportBtn = document.querySelector("#export-notes");

// FUNCTIONS

// showNotes : mostra as notas feitas pelo usuário de modo que elas sejam únicas, ou seja, uma nota não substitua a outra 
function showNotes() {
    cleanNotes();

    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed);

        notesContainer.appendChild(noteElement);
    });
}

function cleanNotes() {
    notesContainer.replaceChildren([])
}

// addNote : adiciona uma nota nova de acordo com os dados fornecidos pelo usuário, usando a função showNotes para cria-las individualmente e ao fim limpando o input 
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

// função para gerar um Id aleatório para as tarefas, os Id´s podem ir de 1 a 5000 
function genereteId() {
    return Math.floor(Math.random() * 5000);
}

// criando o elemento mostrado na tela para o usuário, a função pega os dados digitados e cria os elementos necessários para mostrar as notas na tela do navegador.
// função de fixar as notas
function createNote(id, content, fixed) {
    const element = document.createElement("div");
    element.classList.add("note");

    const textarea = document.createElement("textarea");
    textarea.value = content;

    textarea.placeholder = "Adicione algum texto...";
    element.appendChild(textarea);


    const pinICon = document.createElement("i");
    pinICon.classList.add(...["bi", "bi-pin"]);
    element.appendChild(pinICon);

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add(...["bi", "bi-x-lg"]);
    element.appendChild(deleteIcon);

    const duplicateIcon = document.createElement("i");
    duplicateIcon.classList.add(...["bi", "bi-file-earmark-plus"]);
    element.appendChild(duplicateIcon);

    if(fixed) {
        element.classList.add("fixed");
    }

    // eventos do elemento
    element.querySelector("textarea").addEventListener("keyup", (e) => {
        const noteContent = e.target.value;

        updateNote(id, noteContent);
    });

    element.querySelector(".bi-pin").addEventListener("click", () => {
        toggleFixedNote(id);
    });

    element.querySelector(".bi-x-lg").addEventListener("click", () => {
        deleteNote(id, element);
    });

    element.querySelector(".bi-file-earmark-plus").addEventListener("click", () => {
        copyNote(id);
    });

    return element;
}

// botao de fixar a nota 
function toggleFixedNote(id) {
    const notes = getNotes();
    const targetNotes = notes.filter((note) => note.id === id)[0];

    targetNotes.fixed = !targetNotes.fixed;

    saveNotes(notes);
    showNotes();
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNotes(notes);

    notesContainer.removeChild(element);
}

function copyNote(id) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0];

    const noteObject = {
        id: genereteId(),
        content: targetNote.content,
        fixed: false
    };

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed);

    notesContainer.appendChild(noteElement);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, content) {
    const notes = getNotes();
    const targetNote = notes.filter((note) => note.id === id)[0];

    targetNote.content = content;

    saveNotes(notes)
}


// LOCAL STORAGE
// função para guardar as notas criadas no local storage
function getNotes() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");

    const orderedNotes = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1)

    return orderedNotes;
}

// salvando as notas no local storage, assim mesmo que o usário renderize a tela do nevegador, as tarefas salvas ainda estaram lá
function saveNotes(notes) {
    localStorage.setItem("notes", JSON.stringify(notes))
}

function searchNotes(search) {
    const searchResults = getNotes().filter((note) => note.content.includes(search));

    if(search !== "") {
        cleanNotes();

        searchResults.forEach((note) => {
            const noteElement = createNote(note.id, note.content);
            notesContainer.appendChild(noteElement);
        });

        return
    }

    cleanNotes();
    showNotes();
}

function exportData() {
    const note = getNotes();
}

// EVENTS 
// evento de click que ativa a função addNote 
addNotesBtn.addEventListener("click", () => addNote());

searchInput.addEventListener("keyup", (e) => {
    const search = e.target.value;

    searchNotes(search);
});

notesInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addNote();
    }
});

exportBtn.addEventListener("click", () => {
    exportData();
});

// INITIALIZATION
showNotes();