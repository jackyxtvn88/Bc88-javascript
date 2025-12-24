class sinhVien{
    // thuộc tính - attribute - property - field....
    // đặc trưng của đối tượng
    constructor(maSV, tenSV, namSinh, lop, diaChi){
        // this: đại diện cho đối tượng được tạo ra từ class
        // khởi tạo thuộc tính mã sinh viên cho object sinhVien
        // maSV: được lấy từ tham số truyền vào
        this.maSV = maSV;
        this.tenSV = tenSV;
        this.namSinh = namSinh;
        this.lop = lop;
        this.diaChi = diaChi;
    }
    // phương thức - method - hành động - behavior...
    hienThiThongTin(){
        console.log(`Mã SV: ${this.maSV}
             - Tên SV: ${this.tenSV}
              - Năm sinh: ${this.namSinh} 
              - Lớp: ${this.lop} 
              - Địa chỉ: ${this.diaChi}`
            );
    }
}

// tạo đối tượng sinhVien từ class sinhVien
// tạo đối tượng sinh viên dùng từ khóa new
const sv1 = new sinhVien("SV001", "Nguyễn Văn A", 2000, "BC88", "Hà Nội");
sv1.hienThiThongTin();
console.log(sv1.maSV);
const sv2 = new sinhVien("SV002", "Trần Thị B", 2001, "BC88", "Hải Phòng");
sv2.hienThiThongTin();

// OOP: có 4 tính chất chính:
// 1. tính kế thừa (inheritance) => dễ 
// quan hệ cha - con
// class con kế thừa tất cả thuộc tính và phương thức của class cha
// Lưu ý: class cha không được dùng để tạo đối tượng (tính trừu tượng)
// class cha chỉ để dùng cho class con kế thừa
class NhanVien{ //class cha
    constructor(maNV, tenNV, luongCoBan){
        this.maNV = maNV;
        this.tenNV = tenNV;
        this.luongCoBan = luongCoBan;
    }
    hienThiThongTin(){
        console.log(`
            mã NV: ${this.maNV} \n
            tên NV: ${this.tenNV} \n
            lương cơ bản: ${this.luongCoBan} \n
        `);
    }

}
// class con: NhanVienFullTime và NhanVienPartTime
class NhanVienFullTime extends NhanVien{
    constructor(maNV, tenNV, luongCoBan, soGioLamThem){
        // gọi hàm khởi tạo của class cha
        super(maNV, tenNV, luongCoBan); // kế thừa hàm khởi tạo của class cha
        this.soGioLamThem = soGioLamThem;
    }
    hienThiThongTin(){
        // gọi phương thức hienThiThongTin của class cha
        super.hienThiThongTin();
        console.log(`số giờ làm thêm: ${this.soGioLamThem}`);
}
}
let nv1 = new NhanVienFullTime("NV001", "Lê Văn C", 10000000, 20);
nv1.hienThiThongTin();

// {
//     "maNV": "NV001",
//     "tenNV": "Lê Văn C",
//     "luongCoBan": 10000000,
//     "soGioLamThem": 20
// }


// 2. tính đóng gói (encapsulation) => dễ 

// 3. tính đa hình (polymorphism) => khó
// 4. tính trừu tượng (abstraction) => khó