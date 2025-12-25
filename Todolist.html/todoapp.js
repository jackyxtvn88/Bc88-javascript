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

let filterTask = lisTasks; // mảng lưu trữ công việc đã được lọc

// filter công việc theo trạng thái: tất cả, chưa hoàn thành, đã hoàn thành
const filterTasksByStatus = () => {
    // học OOP để có thể lưu trữ dữ liệu của task: id, tên công việc, trạng thái
    //  kết hợp với hàm filter của mảng
    // bước 1: lấy 3 cái button gồm có là: tất cả, chưa hoàn thành, đã hoàn thành
    const btnAll = document.querySelectorAll(".filter-btn");
    let currentFilter = "all"; // trạng thái lọc hiện tại
    btnAll.forEach((btn) =>{
        btn.onclick = () =>{
            const status = btn.dataset.filter; // lấy giá trị từ thuộc tính data-filter
            console.log("lọc theo trạng thái:", status);
            currentFilter = status;
            // let filterTask =[];
            if (currentFilter === "all"){
                return  lisTasks;
            } else if(currentFilter === "active"){
                return  lisTasks.filter((task) => task.status === "todo");
            } else {
                return  lisTasks.filter((task) => task.status === "completed");
            }
        }
    }
       )
    //    renderTasks();

}

// hàm hiển thị danh sách công việc
const renderTasks = () => {

   let filterTask = filterTasksByStatus();
  //   const li = document.createElement(`li`);
  // li.innerHTML = `<li class="flex item-center jusity-center bg-gray-100 p-4 rounded-lg">
  //                 <span class="font-semibold">[ID-1] Implement login</span>
  //                 <div>
  //                      <button class="p-2 bg-yellow-500 text-white rounded-md">Sửa</button>
  //                      <button class="p-2 bg-red-500 text-white rounded-md">Xóa</button>
  //                 </div>
  //              </li>`
  //             let ul = document.getElementById("todolist");
  //             ul.appendChild(li);
  // //  render list task
  for (let i = 0; i < filterTask.length; i++) {
    const li = document.createElement(`li`);
    //  => <li></li>
    // <li class="flex item-center jusity-center bg-gray-100 p-4 rounded-lg">
    //  <div>
    //          <input type="checkbox" class="mr-2" />
    //          <span class="font-semibold">${lisTasks[i]}</span>
    // </div>
    //              <div>
    //                  <button class="p-2 bg-yellow-500 text-white rounded-md">Sửa</button>
    //                  <button class="p-2 bg-red-500 text-white rounded-md">Xóa</button>
    //             </div>
    //            </li>
    li.className = "flex item-center jusity-center bg-gray-100 p-4 rounded-lg";
    // vì trong thẻ li có 2 thẻ div con
    // => b1 tạo element div
    // => b2 appendchild để add div vào li
    const divInfo = document.createElement("div");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.className = "mr-2";
    // todo: thêm sự kiện cho checkbox
    divInfo.appendChild(checkBox);

    const span = document.createElement("span");
    span.className = "font-semibold";
    span.innerText = `${lisTasks[i].id} - ${lisTasks[i].name}`; //listTasks[i] = task("ID-1","Implement login", "todo")
    divInfo.appendChild(span);

    li.appendChild(divInfo);

    const divActions = document.createElement("div");
    const btnEdit = document.createElement("button");
    btnEdit.className = "p-2 bg-yellow-500 text-white rounded-md mr-2";
    btnEdit.innerText = "sửa";
    // append function để handle logic sửa task
    divActions.appendChild(btnEdit);

    const btnDelete = document.createElement("button");
    btnDelete.className = "p-2 bg-red-500 text-white rounded-md ";
    btnDelete.innerText =" xóa";
    // append function để handle logic xóa task
    divActions.appendChild(btnDelete);

    li.appendChild(divActions);

    document.getElementById("todoList").appendChild(li);

    // handle hidden icon " không có task nào"
    const noTaskDiv = document.getElementById("emptyState");
    // dùng toán tử 3 ngôi để render
    noTaskDiv.style.display = lisTasks.length ? "none": "block";
    // 0: flase > 0: true
    
  }
};
renderTasks();

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
