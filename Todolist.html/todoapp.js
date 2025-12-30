// =======================
// 1) Tạo class Task (đối tượng công việc)
// =======================
class Task {
  constructor(id, name, status) {
    this.id = id;       // mã ID của task (VD: ID-1)
    this.name = name;   // tên công việc (VD: Implement login)
    this.status = status; // trạng thái: todo / inprogress / done
  }
}

// =======================
// 2) Mảng chứa danh sách công việc (dữ liệu ban đầu)
// =======================
let listTasks = [
  new Task("ID-1", "Implement login", "todo"),
  new Task("ID-2", "Design database schema", "inprogress"),
  new Task("ID-3", "Set up CI/CD pipeline", "done"),
];

// currentFilter dùng để lưu trạng thái lọc hiện tại
// có thể là: all / active / completed
let currentFilter = "all";

// =======================
// 3) Hàm lọc task theo trạng thái
// =======================
// all: hiển thị tất cả
// active: hiển thị task chưa done
// completed: hiển thị task done
const filterTasksByStatus = () => {
  // active = những task chưa hoàn thành
  if (currentFilter === "active") {
    return listTasks.filter(task => task.status !== "done");
  }

  // completed = những task đã hoàn thành
  if (currentFilter === "completed") {
    return listTasks.filter(task => task.status === "done");
  }

  // all = trả về toàn bộ list
  return listTasks;
};

// =======================
// 4) Khởi tạo các nút filter (All / Active / Completed)
// =======================
const initFilterButtons = () => {
  // lấy tất cả các button có class filter-btn
  const btnAll = document.querySelectorAll(".filter-btn");

  // gắn sự kiện click cho từng nút
  btnAll.forEach(btn => {
    btn.onclick = () => {
      // lấy trạng thái lọc từ data-filter (VD: all, active, completed)
      currentFilter = btn.dataset.filter;

      // render lại danh sách sau khi đổi filter
      renderTasks();
    };
  });
};

// =======================
// 5) Hàm render danh sách công việc ra HTML
// =======================
const renderTasks = () => {
  const todoListElement = document.getElementById("todoList");

  // reset danh sách trước khi render lại (tránh bị lặp)
  todoListElement.innerHTML = "";

  // lấy danh sách task đã được lọc
  const filterTask = filterTasksByStatus();

  // =======================
  // 5.1) Tính toán số lượng task để hiển thị count
  // =======================
  const totalCount = listTasks.length;
  const activeCount = listTasks.filter(task => task.status !== "done").length;
  const completedCount = listTasks.filter(task => task.status === "done").length;

  // update lên giao diện
  document.getElementById("totalCount").innerText = totalCount;
  document.getElementById("activeCount").innerText = activeCount;
  document.getElementById("completedCount").innerText = completedCount;

  // =======================
  // 5.2) Render từng task thành thẻ <li>
  // =======================
  filterTask.forEach(task => {
    const li = document.createElement("li");

    // thêm class cho đẹp
    li.className =
      "flex items-center justify-between bg-gray-100 p-4 rounded-lg mb-2";

    // =======================
    // Bên trái: checkbox + tên task
    // =======================
    const divInfo = document.createElement("div");
    divInfo.className = "flex items-center";

    // tạo checkbox
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "mr-2";

    // nếu task đã done thì checkbox tick sẵn
    checkBox.checked = task.status === "done";

    // khi click checkbox -> cập nhật status
    checkBox.onchange = () => {
      // tìm task trong listTasks theo id
      const taskFound = listTasks.find(t => t.id === task.id);

      if (taskFound) {
        // nếu checkbox được tick -> done
        // nếu bỏ tick -> todo
        taskFound.status = checkBox.checked ? "done" : "todo";

        // render lại danh sách sau khi đổi trạng thái
        renderTasks();
      }
    };

    // tạo span hiển thị ID và name task
    const span = document.createElement("span");
    span.className = "font-semibold";
    span.innerText = `${task.id} - ${task.name}`;

    // append checkbox và span vào divInfo
    divInfo.appendChild(checkBox);
    divInfo.appendChild(span);

    // append divInfo vào li
    li.appendChild(divInfo);

    // =======================
    // Bên phải: nút sửa và xóa
    // =======================
    const divActions = document.createElement("div");

    // nút sửa
    const btnEdit = document.createElement("button");
    btnEdit.className = "p-2 bg-yellow-500 text-white rounded-md mr-2";
    btnEdit.innerText = "Sửa";

    // click sửa -> gọi hàm editTask
    btnEdit.onclick = () => editTask(task.id);

    // nút xóa
    const btnDelete = document.createElement("button");
    btnDelete.className = "p-2 bg-red-500 text-white rounded-md";
    btnDelete.innerText = "Xóa";

    // click xóa -> gọi hàm deleteTask
    btnDelete.onclick = () => deleteTask(task.id);

    // append 2 nút vào divActions
    divActions.appendChild(btnEdit);
    divActions.appendChild(btnDelete);

    // append divActions vào li
    li.appendChild(divActions);

    // append li vào ul
    todoListElement.appendChild(li);
  });

  // =======================
  // 5.3) Hiển thị trạng thái "Không có công việc" nếu list rỗng
  // =======================
  const noTaskDiv = document.getElementById("emptyState");
  noTaskDiv.style.display = filterTask.length === 0 ? "block" : "none";
};

// =======================
// 6) Thêm task mới (Add Task)
// =======================
const btnAdd = document.getElementById("addBtn");
btnAdd.onclick = () => {
  const taskInput = document.getElementById("todoInput");

  // lấy giá trị người dùng nhập
  const newTaskName = taskInput.value.trim();

  // nếu input rỗng thì báo lỗi
  if (!newTaskName) {
    alert("Vui lòng nhập công việc!");
    return;
  }

  // tạo id mới dựa vào độ dài mảng hiện tại
  const newID = `ID-${listTasks.length + 1}`;

  // tạo đối tượng task mới
  const newTaskObj = new Task(newID, newTaskName, "todo");

  // thêm task vào listTasks
  listTasks.push(newTaskObj);

  // reset input
  taskInput.value = "";

  // render lại danh sách
  renderTasks();
};

// =======================
// 7) Sửa task (Edit Task)
// =======================
const editTask = (id) => {
  // tìm task theo id
  const taskFound = listTasks.find(task => task.id === id);
  if (!taskFound) return;

  // prompt để nhập tên mới
  const newName = prompt("Nhập tên công việc mới:", taskFound.name);

  // nếu người dùng nhập hợp lệ thì update
  if (newName && newName.trim() !== "") {
    taskFound.name = newName.trim();
    renderTasks();
  }
};

// =======================
// 8) Xóa task (Delete Task)
// =======================
const deleteTask = (id) => {
  // confirm trước khi xóa
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa?");
  if (!confirmDelete) return;

  // lọc bỏ task có id tương ứng
  listTasks = listTasks.filter(task => task.id !== id);

  renderTasks();
};

// =======================
// 9) Khởi tạo ban đầu
// =======================
initFilterButtons(); // setup filter buttons
renderTasks();       // render danh sách lần đầu
