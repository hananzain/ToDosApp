const UNCOMPLETED_LIST_TODO_ID = "todos";
const COMPLETED_LIST_TODO_ID = "completed-todos";

function makeTodo(data, timestamp, isCompleted){

    const textTitle = document.createElement("h2");
    textTitle.innerText = data;

    const textTimestamp = document.createElement("p");
    textTimestamp.innerText = timestamp;

    const textContainer = document.createElement("div");
    textContainer.classList.add("inner")
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement("div");
    container.classList.add("item", "shadow")
    container.append(textContainer);

    if(isCompleted){
        container.append(
            createUndoButton(),
            createTrashButton()
        );
    } else{
        container.append(
            createCheckButton()
        );
    }

    return container;
}

function createUndoButton() {
    return createButton("undo-button", function(event){
        undoTaskFromCompleted(event.target.parentElement);
    });
}

function createTrashButton() {
    return createButton("trash-button", function(event){
        removeTaskFromCompleted(event.target.parentElement);
    });
}

function createCheckButton() {
    return createButton("check-button", function(event){
        addTaskToCompleted(event.target.parentElement);
    });
}

function createButton(buttonTypeClass, eventListener){
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event){
        eventListener(event);
    });
    return button;
}


function addTodo() {
    const uncompletedTODOList = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const textTodo = document.getElementById("title").ariaValueMax;
    const timestamp = document.getElementById("date").ariaValueMax;
    const todo = makeTodo(textTodo, timestamp, false);

    uncompletedTODOList.append(todo);
}
function addTaskToCompleted(taskElement){
    const listCompleted = document.getElementById(COMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, true);

    listCompleted.append(newTodo);
    taskElement.remove();
}

function removeTaskFromCompleted(taskElement){
    taskElement.remove();
}

function undoTaskFromCompleted(taskElement){
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_TODO_ID);
    const taskTitle = taskElement.querySelector(".inner > h2").innerText;
    const taskTimestamp = taskElement.querySelector(".inner > p").innerText;

    const newTodo = makeTodo(taskTitle, taskTimestamp, false);

    listUncompleted.append(newTodo);
    taskElement.remove();
}