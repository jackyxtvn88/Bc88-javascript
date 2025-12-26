//  tạo đối tượng task
class task{
    constructor(id,name,status){
        this.id = id;
        this.name = name;
        this.status = status;
    }
}

// "[ID-1] Implement login",
//   "[ID-2] Design database schema",
//   "[ID-3] Set up  CI/CD pipeline",

let lisTasks = [
    new task ("ID-1","Implement login", "todo"),
    new task ("ID-2","Design database schema", "inprogress"),
    new task ("ID-3","Set up  CI/CD pipeline", "done"),
];

let currentFilter = "all"; // trạng thái lọc hiện tại

// filter công việc theo trạng thái: tất cả, chưa hoàn thành, đã hoàn thành
const filterTasksByStatus = () => {
    if (currentFilter === "all") {
        return [...lisTasks];
    }

    if (currentFilter === "active") {
        return lisTasks.filter((task) => task.status !== "done");
    }

    return lisTasks.filter((task) => task.status === "done");
};

const initFilterButtons = () => {
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (!filterButtons.length) return;

    const updateButtonStyles = () => {
        filterButtons.forEach((btn) => {
            const isActive = btn.dataset.filter === currentFilter;
            btn.classList.toggle("bg-blue-500", isActive);
            btn.classList.toggle("text-white", isActive);
            btn.classList.toggle("bg-gray-200", !isActive);
            btn.classList.toggle("text-gray-700", !isActive);
        });
    };

    filterButtons.forEach((btn) => {
        btn.onclick = () => {
            currentFilter = btn.dataset.filter;
            const todoList = document.getElementById("todoList");
            if (todoList) {
                todoList.innerHTML = "";
            }
            updateButtonStyles();
            renderTasks();
        };
    });

    updateButtonStyles();
};

// hàm hiển thị danh sách công việc
const renderTasks = () => {
    const todoList = document.getElementById("todoList");
    if (!todoList) return;

    const filteredTasks = filterTasksByStatus();
    todoList.innerHTML = "";

    for (let i = 0; i < filteredTasks.length; i++) {
        const taskItem = filteredTasks[i];
        const li = document.createElement(`li`);
        li.className = "flex item-center jusity-center bg-gray-100 p-4 rounded-lg";

        const divInfo = document.createElement("div");

        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.className = "mr-2";
        divInfo.appendChild(checkBox);

        const span = document.createElement("span");
        span.className = "font-semibold";
        span.innerText = `${taskItem.id} - ${taskItem.name}`;
        divInfo.appendChild(span);

        li.appendChild(divInfo);

        const divActions = document.createElement("div");
        const btnEdit = document.createElement("button");
        btnEdit.className = "p-2 bg-yellow-500 text-white rounded-md mr-2";
        btnEdit.innerText = "sửa";
        divActions.appendChild(btnEdit);

        const btnDelete = document.createElement("button");
        btnDelete.className = "p-2 bg-red-500 text-white rounded-md ";
        btnDelete.innerText = " xóa";
        divActions.appendChild(btnDelete);

        li.appendChild(divActions);

        todoList.appendChild(li);
    }

    const noTaskDiv = document.getElementById("emptyState");
    if (noTaskDiv) {
        noTaskDiv.style.display = filteredTasks.length ? "none" : "block";
    }
};

// tạo task mới

//  bước1: tìm thẻ button thêm công việc
const btnAdd = document.getElementById("addBtn");
btnAdd.onclick = () => {
// bước2: lấy giá trị từ thẻ input
    const taskInput = document.getElementById("todoInput");
    const newTask = taskInput.value;
// bước3: thêm công việc vào mảng lisTasks
// listTasks.push(newTask);
// tạo id tự động cho task mới
// dựa vào cái số lượng phần tử hiện tại trong mảng
    const newID = lisTasks.length + 1 ;
    const TaskID = `ID-${newID}`;
    const newTaskObj = new task(TaskID, newTask, "todo");
    lisTasks.push(newTaskObj);

// xóa toàn bộ thẻ li hiện tại trong ul để 
// tránh việc lặp lại khi render lại
// inerHTML: thay đổi nội dung bên trong thẻ
// setInterval
// setInterval(() => {
// document.getElementById("todoList").innerHTML = "";}, 2000;
// );
// setInterval(() => {
//     renderTasks();
// }, 2000;
// );
document.getElementById("todoList").innerHTML = ""
renderTasks(); // re-render danh sách công việc

// bước 4: xóa giá trị trong thẻ input sau khi thêm công việc
taskInput.value = "";
};

//  update status công việc

// xóa danh sách công việc

initFilterButtons();
renderTasks();
