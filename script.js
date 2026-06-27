const taskInput=document.querySelector("#task-input");
const addBtn=document.querySelector("#add-btn");
const taskList=document.querySelector("#task-list");
const totalCount=document.querySelector("#total-count");
const completedCount=document.querySelector("#completed-count");
const pendingCount=document.querySelector("#pending-count");
const allBtn=document.querySelector("#all-btn");
const pendingBtn=document.querySelector("#pending-btn");
const completedBtn=document.querySelector("#completed-btn");

let tasks = [];

function renderTasks(taskArray){
    taskList.innerHTML="";
    taskArray.forEach((task,index) => {
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
        renderTasks(tasks);
        });
        if(task.completed){
        taskText.classList.add("completed");
        }
        
        deleteBtn.addEventListener("click", () => {
        tasks=tasks.filter((t)=> t.id!=task.id);
        renderTasks(tasks);
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
        id:Date.now(),
        text:taskText,
        completed:false,
    });
    renderTasks(tasks);
    taskInput.value="";
});


allBtn.addEventListener("click",() => {
    renderTasks(tasks);
});

pendingBtn.addEventListener("click",() => {
    const pendingTasks=tasks.filter((task) => {
        return !task.completed;
    });
    renderTasks(pendingTasks);
});

completedBtn.addEventListener("click",() => {
    const completedTasks=tasks.filter((task) => {
        return task.completed;
    });
    renderTasks(completedTasks);
});

