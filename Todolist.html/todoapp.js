// =============================
// 1) TẠO ĐỐI TƯỢNG TASK
// =============================
class Task {
  constructor(id, name, status) {
    this.id = id;       // ID công việc (VD: ID-1)
    this.name = name;   // Tên công việc
    this.status = status; // Trạng thái: todo / inprogress / done
  }
}

// =============================
// 2) MẢNG LƯU DANH SÁCH TASK
// =============================
let listTasks = [
  new Task("ID-1", "Implement login", "todo"),
  new Task("ID-2", "Design database schema", "inprogress"),
  new Task("ID-3", "Set up CI/CD pipeline", "done"),
];

// currentFilter dùng để lưu trạng thái lọc hiện tại
// all: tất cả
// active: chưa hoàn thành (status != done)
// completed: đã hoàn thành (status == done)
let currentFilter = "all";

// =============================
// 3) HÀM FILTER TASK THEO STATUS
// =============================
const filterTasksByStatus = () => {
  if (currentFilter === "active") {
    // active: những task chưa done
    return listTasks.filter(task => task.status !== "done");
  }

  if (currentFilter === "completed") {
    // completed: những task done
    return listTasks.filter(task => task.status === "done");
  }

  // all: trả về tất cả
  return listTasks;
};

// =============================
// 4) KHỞI TẠO BUTTON FILTER
// =============================
const initFilterButtons = () => {
  const btnAll = document.querySelectorAll(".filter-btn");

  btnAll.forEach(btn => {
    btn.onclick = () => {
      // lấy trạng thái filter từ data-filter của button
      currentFilter = btn.dataset.filter;

      // render lại danh sách khi đổi filter
      renderTasks();
    };
  });
};

// =============================
// 5) HÀM HIỂN THỊ DANH SÁCH TASK
// =============================
const renderTasks = () => {
  const todoListElement = document.getElementById("todoList");

  // clear danh sách trước khi render (tránh lặp)
  todoListElement.innerHTML = "";

  // lấy danh sách task sau khi lọc
  const filterTask = filterTasksByStatus();

  // =========================
  // 5.1) TÍNH TOÁN COUNT TASK
  // =========================
  const totalCount = listTasks.length;
  const activeCount = listTasks.filter(task => task.status !== "done").length;
  const completedCount = listTasks.filter(task => task.status === "done").length;

  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("activeCount").innerText = activeCount;
  document.getElementById("completedCount").innerText = completedCount;

  // =========================
  // 5.2) RENDER TASK
  // =========================
  filterTask.forEach(task => {
    const li = document.createElement("li");
    li.className = "flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-2";

    // ---- DIV BÊN TRÁI (checkbox + text)
    const divInfo = document.createElement("div");
    divInfo.className = "flex items-center";

    // tạo checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "mr-2";

    // nếu task done thì checkbox sẽ tick sẵn
    checkBox.checked = task.status === "done";

    // khi click checkbox -> đổi trạng thái
    checkBox.onchange = () => {
      task.status = checkBox.checked ? "done" : "todo";
      renderTasks(); // render lại UI sau khi thay đổi
    };

    // tạo text hiển thị task
    const span = document.createElement("span");
    span.className = "font-semibold";
    span.innerText = `${task.id} - ${task.name}`;

    // add checkbox + span vào divInfo
    divInfo.appendChild(checkBox);
    divInfo.appendChild(span);

    // add divInfo vào li
    li.appendChild(divInfo);

    // ---- DIV BÊN PHẢI (edit + delete)
    const divActions = document.createElement("div");

    // nút sửa
    const btnEdit = document.createElement("button");
    btnEdit.className = "p-2 bg-yellow-500 text-white rounded-md mr-2";
    btnEdit.innerText = "Sửa";

    // logic sửa task
    btnEdit.onclick = () => {
      const newName = prompt("Nhập tên mới:", task.name);
      if (newName && newName.trim() !== "") {
        task.name = newName.trim();
        renderTasks();
      }
    };

    // nút xóa
    const btnDelete = document.createElement("button");
    btnDelete.className = "p-2 bg-red-500 text-white rounded-md";
    btnDelete.innerText = "Xóa";

    // logic xóa task
    btnDelete.onclick = () => {
      const confirmDelete = confirm("Bạn có chắc chắn muốn xóa?");
      if (confirmDelete) {
        listTasks = listTasks.filter(t => t.id !== task.id);
        renderTasks();
      }
    };

    divActions.appendChild(btnEdit);
    divActions.appendChild(btnDelete);

    li.appendChild(divActions);

    // add li vào ul
    todoListElement.appendChild(li);
  });

  // =========================
  // 5.3) HIỂN THỊ EMPTY STATE
  // =========================
  const noTaskDiv = document.getElementById("emptyState");

  // nếu danh sách rỗng => hiện emptyState
  // nếu có task => ẩn emptyState
  noTaskDiv.style.display = filterTask.length === 0 ? "block" : "none";
};

// =============================
// 6) THÊM TASK MỚI
// =============================
const btnAdd = document.getElementById("addBtn");

btnAdd.onclick = () => {
  const taskInput = document.getElementById("todoInput");
  const newTaskName = taskInput.value.trim();

  // nếu input rỗng => báo lỗi
  if (!newTaskName) {
    alert("Vui lòng nhập công việc!");
    return;
  }

  // tạo id mới dựa theo số lượng task
  const newID = `ID-${listTasks.length + 1}`;

  // tạo task mới
  const newTaskObj = new Task(newID, newTaskName, "todo");

  // thêm task vào mảng
  listTasks.push(newTaskObj);

  // reset input
  taskInput.value = "";

  // render lại UI
  renderTasks();
};

// =============================
// 7) INIT APP
// =============================
initFilterButtons();
renderTasks();
