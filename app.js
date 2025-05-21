const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const localStorageKey = 'myNotes'; //переменная для хранения данных. это название папки в файловой системе, где мы будем хранить наши «файлы» с данными заметок.

function loadNotes() { //загрузка заметок из localStorage
  const storedNotes = localStorage.getItem(localStorageKey); // как бы получение данных из заметок
  return storedNotes ? JSON.parse(storedNotes) : []; 
}

function saveNotes() { //сохранение заметок в localStorage
  localStorage.setItem(localStorageKey, JSON.stringify(notes)); //сохранение данных setItem
}

let notes = loadNotes();



function render() {
    listElement.innerHTML = ''
    for(let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }
    saveNotes(); // сохраняем заметки после каждой отрисовки
}

render() // функция render() перерисовывает список, чтобы отобразить новую заметку.

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
