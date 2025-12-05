console.log("Hello word");

//khai báo biến
//=> let, const, var(không nên dùng)

let number = 10;
let number1 = 3.8;
let fullname = "Nguyen Van A";
console.log("Number:", number);
console.log("Full name ", fullname);

const PI = 3.14;
const DATABASE_NAME = "BC88";
console.log("PI: ", PI);

//operator + - + * /
let number2 = 5;
let number3 = 7;
let result = number2 + number3;
console.log("Result: ", result);
console.log("Result: ", number2 + number3);

let number4 = 10;
let number5 = 6;
let result1 = number4 - number5;
console.log("Result; ", result1);

let number6 = 12;
let number7 = 8;
let result2 = number6 + number7;
console.log("Result: ", result2);

let number8 = 20;
let number9 = 6;
//chia lấy phần nguyên
// math.floor
let result3 = Math.floor(number8 / number9);
console.log("Result3: ", result3);

//chia lây phần dư
let result4 = number8 % number9;
console.log("Result4: ", result4);

//result++, result--, ++result, result += 2,...
//result++, result--
result = result + 1; //result++
result = result - 1; //result--
result = result + 2; //result +=2

result = 10;
let demo = result++;
// ý nghĩa:
// bước 1:  gắn giá trị của result(10) cho demo ==> demo=10
// Bước 2: tăng giá trị của result lên 1 => result = 11
console.log("Demo: ", demo);
console.log("Result: ", result);

result = 10;
demo = ++result;
// ý nghĩa:
// Bước 1: tăng giá trị của result lên 1 => result = 11
// Bước 2: gán giá trị của result (11) cho demo => demo = 11
console.log("Demo: ", demo);
console.log("Result: ", result);

//operator so sánh >, <, <=, ==, ===, !=,!==
// condition statement: if...else
// True or False
console.log(number8 > number9);
console.log(number8 < number9);
console.log(number8 >= number9);
console.log(number8 <= number9);

let number10 = "20";
console.log(number8 == number10); // true
//Lưu ý: == so sánh giá trị, KHÔNG so sánh kiểu dữ liệu
// KHÔNG NÊN SỬ DỤNG TOÁN TỬ NÀY
console.log(number8 === number10); // false
// Lưu ý: === so sánh giá trị và kiểu dữ liệu

console.log(number8 != number9); // true - KHÔNG NÊN DÙNG
console.log(number8 !== number10); // true

//Bài tập 1: Tính lương nhân viên trong 1 tháng
//input:
// + lương cơ bản/ngày
// + số ngày làm việc trong tháng
//output: lương nhân viên trong 1 tháng
//process:
// luongThang = luongCoBan * soNgayLamViec
let luongCoBan = 500000;
let soNgayLamViec = 22;

//process
let luongThang = luongCoBan * soNgayLamViec;

//output
console.log("Lương tháng của nhân viên: ", luongThang);

//Bài tập 2: Tính chu vi

// let chieuDai = prompt("Nhập vào chiều dài: ");
// let chieuRong = prompt("Nhập vào chiều rộng: ");
let chieuDai = "10";
let chieuRong = "5";

// LUU Ý: prompt luôn trả về giá trị kiểu string => cần ép kiểu về number
chieuDai = Number (chieuDai);

console.log("Chiều dài: ", chieuDai);
console.log("Chiều rộng: ", chieuRong);

// check datatype
console.log("datatype chieuDai: ", typeof chieuDai);