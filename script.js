const addBtn = document.querySelector("#push");
const newTaskInput = document.querySelector("#wrapper-input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");
let taskCount = 0;

const displayCount = (taskCount) => {
  countValue.innerText = taskCount;
};

const deleteTask = (button) => {
  button.parentNode.remove();
  taskCount -= 1;
  displayCount(taskCount);
};

const editTask = (editBtn) => {
  let targetElement = editBtn;
  if (!(editBtn.className == "edit")) {
    targetElement = editBtn.parentElement;
  }
  newTaskInput.value = targetElement.previousElementSibling?.innerText;
  targetElement.parentNode.remove();
  taskCount -= 1;
  displayCount(taskCount);
};

const toggleTaskCompletion = (checkBox) => {
  checkBox.nextElementSibling.classList.toggle("completed");
  if (checkBox.checked) {
    taskCount -= 1;
  } else {
    taskCount += 1;
  }
  displayCount(taskCount);
};

const addTask = () => {
  const taskName = newTaskInput.value.trim();

  error.style.display = "none";
  if (!taskName) {
    setTimeout(() => {
      error.style.display = "block";
    }, 200);
    return;
  }

  const task = `<div class="task">
    <input type="checkbox" class="task-check">
    <span class="taskname">${taskName}</span>
    <button class="edit">
      <i class="fas fa-pen-square"></i>
    </button>
    <button class="delete">
      <i class="fas fa-trash-alt"></i>
    </button>
  </div>`;
  

  tasksContainer.insertAdjacentHTML("beforeend", task);

  tasksContainer.addEventListener("click", (event) => {
    const clickedButton = event.target;
    if (clickedButton.classList.contains("delete")) {
      deleteTask(clickedButton);
    } else if (clickedButton.classList.contains("edit")) {
      editTask(clickedButton);
    }
  });

  tasksContainer.addEventListener("change", (event) => {
    const checkBox = event.target;
    if (checkBox.classList.contains("task-check")) {
      toggleTaskCompletion(checkBox);
    }
  });

  taskCount += 1;
  displayCount(taskCount);
  newTaskInput.value = "";
};

addBtn.addEventListener("click", addTask);

window.onload = () => {
  taskCount = 0;
  displayCount(taskCount);
  newTaskInput.value = "";
};
