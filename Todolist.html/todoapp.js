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
for (let i = 0; i< lisTasks.length; i++){
    const li = document.createElement(`li`);
    li.innerHTML = `<li class="flex item-center jusity-center bg-gray-100 p-4 rounded-lg">
                  <span class="font-semibold">${lisTasks[i]}</span>
                 <div>
                     <button class="p-2 bg-yellow-500 text-white rounded-md">Sửa</button>
                     <button class="p-2 bg-red-500 text-white rounded-md">Xóa</button>
                </div>
               </li>`
               document.getElementById("todoList").appendChild(li);
}

}
renderTasks();



// tạo task mới

//  update status công việc

// xóa danh sách công việc
