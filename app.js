const inputElement = document.getElementById('title')
const createBtn = document.getElementById('create')
const listElement = document.getElementById('list')

const notes = [
    {
    title: 'записать блок про массивы',
    completed: false,
    }, 
    {
    title: 'рассказать теорию объектов',
    completed: true,
    }, 
]

function render() {
    listElement.innerHTML = ''
    for(let i = 0; i < notes.length; i++) {
    listElement.insertAdjacentHTML('beforeend', getNoteTemplate(notes[i], i))
    }

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
    console.log(note.completed)
    return `
        <li class="list-item">
                    <span class="${note.completed ? 'text-decoration-line-through' : ''}">${note.title}</span>
                    <span>
                        <span class="btn-${note.completed ? 'warning' : 'success'}" data-index="${index}">&check;</span>
                        <span class="btn-danger">&times;</span>
                    </span>
        </li>
    `
}