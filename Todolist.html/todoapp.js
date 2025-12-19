let lisTasks = [
  "[ID-1] Implement login",
  "[ID-2] Design database schema",
  "[ID-3] Set up  CI/CD pipeline",
];

// hàm hiển thị danh sách công việc
const renderTasks = () => {
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
  for (let i = 0; i < lisTasks.length; i++) {
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
    span.innerText = lisTasks[i];
    divInfo.appendChild(span);

    li.appendChild(divInfo);

    const divActions = document.createElement("div");
    const btnEdit = document.createElement("button");
    btnEdit.className = "p-2 bg-yellow-500 text-white rounded-md";
    btnEdit.innerText = "sửa";
    // append function để handle logic sửa task
    divActions.appendChild(btnEdit);

    document.getElementById("todoList").appendChild(li);
  }
};
renderTasks();

// tạo task mới

//  update status công việc

// xóa danh sách công việc
