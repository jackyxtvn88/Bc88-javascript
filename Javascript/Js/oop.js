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
        console.log(`Mã SV: ${this.maSV} - Tên SV: ${this.tenSV} - Năm sinh: ${this.namSinh} - Lớp: ${this.lop} - Địa chỉ: ${this.diaChi}`);
    }
}