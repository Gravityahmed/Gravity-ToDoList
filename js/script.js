let ToDoList = {
  TaskList: [],
  SaveTask: () => {
    let TaskName = document.getElementById("task-name");
    let TaskPriority = document.getElementById("task-priority");
    let TaskDate = document.getElementById("task-date");
    let TaskDisc = document.getElementById("task-description");

    if (TaskName.value.trim() === "" || TaskDate.value === "") {
      return false;
    }

    let Task = {
      taskName: TaskName.value,
      taskPriority: TaskPriority.value,
      taskDate: TaskDate.value,
      taskDisc: TaskDisc.value,
      completed: false,
    };
    ToDoList.TaskList.push(Task);
    ToDoList.SaveInStorage();
    return true;
  },
  ShowTasks: () => {
    let savedArray = ToDoList.getDataFromStorage();
    let container = document.getElementById("task-list");
    let taskCount = document.getElementById("task-count");
    container.innerHTML = "";
    container.onclick = function (event) {
      if (event.target.matches("[data-delete-index]")) {
        ToDoList.Delete(Number(event.target.dataset.deleteIndex));
      }

      if (event.target.matches("[data-complete-index]")) {
        ToDoList.Complete(Number(event.target.dataset.completeIndex));
      }
    };

    savedArray.forEach(function (Task, index) {
      container.innerHTML += `<div class="Task_card ${Task.taskPriority.toLowerCase()} ${Task.completed ? "completed" : ""}">
        <div class="name_section">
          <h2>${Task.taskName}</h2>
          <div class="task-buttons">
            <button class="complete-button" data-complete-index="${index}" type="button">
              ${Task.completed ? "Completed" : "Complete"}
            </button>
            <button class="delete-button" data-delete-index="${index}" type="button">Delete</button>
          </div>
        </div>
        <span>priority: ${Task.taskPriority} | date: ${Task.taskDate}</span>
        <p class="task-description">${Task.taskDisc}</p>
      </div>`;
    });
    taskCount.textContent = `${ToDoList.TaskList.length} ${ToDoList.TaskList.length === 1 ? "task" : "tasks"}`;
  },
  SaveInStorage: () => {
    localStorage.setItem("Tasks", JSON.stringify(ToDoList.TaskList));
  },
  getDataFromStorage: () => {
    let savedArray = JSON.parse(localStorage.getItem("Tasks") || "[]");
    console.log(savedArray);
    ToDoList.TaskList = savedArray;
    return savedArray;
  },
  Reset: () => {
    document.getElementById("task-form").reset();
  },
  Delete: (index) => {
    ToDoList.TaskList.splice(index, 1);
    ToDoList.SaveInStorage();
    ToDoList.ShowTasks();
  },
  Complete: (index) => {
    ToDoList.TaskList[index].completed = !ToDoList.TaskList[index].completed;
    ToDoList.SaveInStorage();
    ToDoList.ShowTasks();
  },
};
ToDoList.ShowTasks();
let SaveBtn = document.getElementById("save-button");
SaveBtn.addEventListener("click", function (event) {
  event.preventDefault();
  if (ToDoList.SaveTask()) {
    ToDoList.ShowTasks();
  }
});

let ResetBtn = document.getElementById("reset-button");
ResetBtn.addEventListener("click", ToDoList.Reset);
