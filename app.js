const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const localStorageKey = 'myNotes'; 

function loadNotes() { 
  const storedNotes = localStorage.getItem(localStorageKey); 
  return storedNotes ? JSON.parse(storedNotes) : []; 
}

function saveNotes() { 
  localStorage.setItem(localStorageKey, JSON.stringify(notes)); 
}

let notes = loadNotes();



function render() {
    listElement.innerHTML = ''
    for(let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
    saveNotes(); 
}

render() 

createBtn.onclick = function () {
    if (inputElement.value.length === 0) {
        return
    }
    const newNote = {
        title: inputElement.value,
        completed: false,
    }
    listElement.insertAdjacentHTML(
        'beforeend',
        getNoteTemplate(newNote)
    )
    notes.push(newNote)
    render()
    inputElement.value = ''
}

listElement.onclick = function (event) {
    if (event.target.dataset.index) {
        const index = parseInt(event.target.dataset.index)
        const type = event.target.dataset.type

        if (type === 'toggle') {
            notes[index].completed = !notes[index].completed
        } else if (type === 'remove') {
            notes.splice(index, 1)
        }

        render()
    }
}

function getNoteTemplate(note, index) {
    return `
        <li class="list-item"  data-completed="${note.completed}">
                    <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
                    <span>
                        <span class="btn-success ${note.completed ? 'warning' : 'success'}" data-index="${index}" data-type="toggle">&check;
                         
                        </span>
     
                        <span class="btn-danger" data-index="${index}" data-type="remove">&times;</span>
                    </span>
        </li>
    `
}
