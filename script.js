const taskInput=document.querySelector("#task-input");
const addBtn=document.querySelector("#add-btn");
const taskList=document.querySelector("#task-list");
const totalCount=document.querySelector("#total-count");
const completedCount=document.querySelector("#completed-count");
const pendingCount=document.querySelector("#pending-count");

let tasks = [];

function renderTasks(){
    taskList.innerHTML="";
    tasks.forEach((task,index) => {
        const li=document.createElement("li");
        li.classList.add("task");
        li.innerHTML=`
        <div class="task-content">
        <input type="checkbox">
        <span>${task.text}</span>
        </div>
        <button class="delete-btn">DELETE</button>
        `;
        const deleteBtn=li.querySelector(".delete-btn");
        const checkbox=li.querySelector("input[type='checkbox']");
        const taskText=li.querySelector("span");

        checkbox.checked=task.completed;
        checkbox.addEventListener("change", () => {
        task.completed=checkbox.checked;
        renderTasks();
        });
        if(task.completed){
        taskText.classList.add("completed");
        }
        
        deleteBtn.addEventListener("click", () => {
        tasks.splice(index, 1);
        renderTasks();
        });
        taskList.appendChild(li);
    });
    updateStats();
}

function updateStats(){
    totalCount.innerText=tasks.length;

    const completedTasks=tasks.filter((task) => {
    return task.completed;
    });
    completedCount.innerText=completedTasks.length;

    pendingCount.innerText=tasks.length-completedTasks.length;
}

addBtn.addEventListener("click",() => {
    const taskText=taskInput.value.trim();
    if(taskText===""){
        return;
    }
    tasks.push({
        text:taskText,
        completed:false,
    });
    renderTasks();
    taskInput.value="";
});

