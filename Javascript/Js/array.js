let number = [5, 6, 8, 10, 12];
// => loop
// .length --> attribute có sẵn của array khi khai báo
// number.length

// B1: in ra từng phần tử trong mảng
for(let i = 0; i < numbers.length; i++) {
    console.log(`${number[i]} `);
}

// B2: tìm phần tử trong mảng 
let target = 10
for (let i = 0; i <= number.length; i++) {
    if (number[1] === target) {
        console.log (`Timf thấy phần tử ${target} tại vì vị trí index ${i}`);
        break;
    }
}

// 1 số hàm có sẵn của array
// .push () -> thêm phần tử vào cuối mảng
console.log (` Mảng ban đầu: ${number}`);
number.push(15);
console.log (` Mảng sau khi thêm 15 vào cuối: ${number}`);

// .unshift -> thêm phần tử vào đầu mảng 
number.unshift(3);
console.log (` Mảng sau khi thêm 3 vào đầu: ${number}`);

// find, includes, sort, join,...
// .includes() -> kiểm tra phần tử có trong mảng không, trả về true/false
let checkNumber8 = number.includes(8);
console.log (` Kiểm tra số 8 có trong mảng hay ko: ${checkNumber8} `);

// .sort((a,b) => a - b) -> sắp xếp mảng theo thứ tự tăng dần
// sort giảm dần -> number.sort((a,b) => b - a)
number.sort((a,b) => a - b);
console.log (` mảng sau khi sắp xếp tăng dần: ${number}`);

number.sort((a,b) => b - a);
console.log (` mảng sau sắp xếp giảm dần: ${number}`)

// .filter -> filter các item trong mảng thỏa mãn các điều kiện 
// lọc số chẵn trong mảng 
// truyền vào function 
// number => number % 2 ===0
let evenNumber = number.filter(number => number % 2 ===0)
console.log (`Cac số chẵn trong mảng: ${evenNumber}`);