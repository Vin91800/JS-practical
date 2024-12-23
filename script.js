document.addEventListener("DOMContentLoaded", () => {
    const task = document.getElementById("task");
    const addTaskButton = document.getElementById("addtask");
    const taskList = document.getElementById("tasklist");
    const searchTask = document.getElementById("searchtask");
  

    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task.text, task.completed));
    };
  

    const saveTasks = () => {
      const tasks = [];
      document.querySelectorAll("#tasklist li").forEach(li => {
        tasks.push({
          text: li.querySelector(".tasktext").textContent,
          completed: li.classList.contains("completed"),
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  

    const addTaskToDOM = (taskText, completed = false) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="tasktext">${taskText}</span>
        <div>
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;
      if (completed) li.classList.add("completed");
      taskList.appendChild(li);
  

      li.addEventListener("click", (e) => {
        if (e.target.className === "tasktext") {
          li.classList.toggle("completed");
          saveTasks();
        }
      });
  

      li.querySelector(".edit").addEventListener("click", () => {
        const newText = prompt("Edit Task:", li.querySelector(".tasktext").textContent);
        if (newText) {
          li.querySelector(".tasktext").textContent = newText;
          saveTasks();
        }
      });
  

      li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        saveTasks();
      });
  
      saveTasks();
    };
  

    addTaskButton.addEventListener("click", () => {
      const taskText = task.value.trim();
      if (taskText) {
        addTaskToDOM(taskText);
        task.value = "";
      }
    });
  

    searchTask.addEventListener("input", () => {
      const query = searchTask.value.toLowerCase();
      document.querySelectorAll("#tasklist li").forEach(li => {
        const taskText = li.querySelector(".tasktext").textContent.toLowerCase();
        li.style.display = taskText.includes(query) ? "" : "none";
      });
    });
  
    loadTasks();
  });