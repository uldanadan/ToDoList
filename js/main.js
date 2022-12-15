const add = document.getElementById('form');
let toDoList = [];
let progressList = [];
let doneList = [];

const updateLocal = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

const showToDo = () => {
    const list = document.getElementById('todoList');
    list.innerHTML = '';
    for (let i = 0; i < toDoList.length; i++) {
        list.innerHTML += `<li>
        ${toDoList[i]} 
        <button class="btn" onclick="changeInProgress(${i})">In Progress</button> 
        <button class="btn btn-danger" onclick="remove(${i})">Delete</button>
        </li>`
    }
}

const showInProgress = () => {
    const list = document.getElementById('progressList');
    list.innerHTML = '';
    for (let i = 0; i < progressList.length; i++) {
        list.innerHTML += `<li>
        ${progressList[i]} 
        <button class="btn" onclick="changeDone(${i})">Done</button> 
        <button class="btn btn-danger" onclick="removeInProgress(${i})">Delete</button>
        </li>`
    }
}

const showDone = () => {
    const list = document.getElementById('doneList');
    list.innerHTML = '';
    for (let i = 0; i < doneList.length; i++) {
        list.innerHTML += `<li>
        ${doneList[i]} 
        <button class="btn btn-danger" onclick="removeDone(${i})">Delete</button>
        </li>`
    }
}

const create = () => {
    add.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = document.getElementById('text').value;
        toDoList.push(text);
        showToDo();
        updateLocal('toDoList', toDoList);
    })
}
create();

const remove = (index) => {
    toDoList.splice(index, 1);
    showToDo();
    updateLocal('toDoList', toDoList);
}

const removeInProgress = (index) => {
    progressList.splice(index, 1);
    showInProgress();
    updateLocal('progressList', progressList);
}

const removeDone = (index) => {
    doneList.splice(index, 1);
    showDone();
    updateLocal('doneList', doneList);
}

const changeInProgress = (index) => {
    toDoList[index].text = true;
    progressList.push(toDoList[index]);
    toDoList.splice(index, 1);
    showInProgress();
    showToDo();
    updateLocal('toDoList', toDoList);
    updateLocal('progressList', progressList);
}

const changeDone = (index) => {
    doneList.push(progressList[index]);
    progressList.splice(index, 1);
    showDone();
    showInProgress();
    updateLocal('progressList', progressList);
    updateLocal('doneList', doneList);
}