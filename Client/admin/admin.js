let dn = document.getElementById("dn");//Nút đăng nhập
let dx = document.getElementById("dx");//Nút đăng xuất
let htdn = document.getElementsByClassName("htdn")[0];//Màn chắn hiển thị khi người dùng click nút đăng nhập
let htdn1 = document.getElementsByClassName("htdn1")[0];//Phần hiển thị ra sau khi bấm đăng nhập
let thoat = document.getElementById("thoat");//Nút thoát trong phần hiển thị đăng nhập
let nutdn = document.getElementById("nutdn");//Nút đăng nhập trong phần hiển thị đăng nhập
let user = document.getElementById("user");//Thẻ input chứa thông tin tài khoản
let pass = document.getElementById("pass");//Thẻ input chứa thông tin mật khẩu
//Các nút quản lí hiển thị trên màn hình chính admin
let qltk = document.getElementById("qltk");
let qlbd = document.getElementById("qlbd");
let tb = document.getElementById("tb");
let tkpt = document.getElementById("tkpt");
let chat = document.getElementById("chat");
//Phần nhỏ hiển thị khi bấm vào từng phần của các nút quản lí
let htContent1 = document.getElementById("htContent1");
let htContent2 = document.getElementById("htContent2");
let htContent3 = document.getElementById("htContent3");
let htContent4 = document.getElementById("htContent4");
let htContent5 = document.getElementById("htContent5");
let thoatndct = document.getElementsByClassName("thoat1");//Nút thoát bên trong các phần nhỏ của hiển thị thông tin
let giamsotrang = document.getElementsByClassName("giam");//Nút tăng số trang
let tangsotrang = document.getElementsByClassName("tang");//Nút giảm số trang
let giatritrang = document.getElementsByClassName("giatri");//Thẻ input chứa giá trị trang
let thongtinquanli = document.getElementById("thongtinquanli");//Thẻ chứa nội dung thông tin quản lí tài khoản dữ liệu được lấy về từ backend
let chuoijson = "";//Chuỗi json trả về dữ liệu phần quản lí thông tin tài khoản
let chuoi1 = "";//Chuyển chuoijson bên trên thành đối tượng
let nutXoa = "";//Chứa các nút xóa trong phần chức năng của hiển thị thông tin 
let nutSua = "";//Chứa các nút sửa trong phần chức năng của hiển thị thông tin 
let maxTrang = "";
let maxVongLap = "";
let timkiemqltk = document.getElementById("timkiemqltk");//Nút tìm kiếm trong phần quản lí thông tin tài khoản
let iptimkiemqltk = document.getElementById("iptimkiemqltk");//Thẻ input trong phần quản lí thông tin tài khoản
console.log(iptimkiemqltk.value);
//Hiển thị sau khi load trang
window.onload = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
//Hiển thị khi nút đăng nhập được click
dn.onclick = function () {
    htdn.style.display = "block";
    htdn1.style.display = "block";
    user.value = "";
    pass.value = "";
}
//Nút thoát tại phần hiển thị đăng nhập được click
thoat.onclick = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
}

fetch("../../index.php/logged")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "OK") {
                        if (ret.data[0] == 1) {
                            dn.style.display = "none";
                            createDisplayUser(ret.data[1], ret.data[3]);
                        }
                    }
                });
        }
    });
//
//Đăng xuất
dx.onclick = function () {
    fetch("../../index.php/logout")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "OK") {
                            if (ret.data == 1) {
                                dn.style.display = "block";
                                dx.style.display = "none";
                            }
                        }
                    });
            }
        });
}
// Người dùng bấm nút "Đăng nhập"
nutdn.onclick = function () {
    fetch("../../index.php/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"user":"' + user.value +
            '","pass":"' + pass.value + '", "loginSubmitted":"1"}'
    })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "OK") {
                            if (ret.data == 1) {
                                // Đăng nhập thành công
                                fetch("../../index.php/logged")
                                    .then(resp2 => {
                                        if (resp2.status == 200) {
                                            resp2.json()
                                                .then(ret2 => {
                                                    if (ret2.status == "OK") {
                                                        if (ret2.data[0] == 1) {
                                                            // console.log(ret2.data[1],ret2.data[2]);
                                                            htdn.style.display = "none";
                                                            htdn1.style.display = "none";
                                                            dn.style.display = "none";
                                                            createDisplayUser(ret2.data[1], ret2.data[3]);
                                                        }
                                                    }
                                                });
                                        }
                                    });
                            }
                            else {
                                // Sai tên đăng nhập hoặc mật khẩu
                                alert("Sai tài khoản hoặc mật khẩu");
                                // document.querySelector("div.err-submit").classList.remove("nodisplay");
                            }
                        } else {
                        }
                    });
            } else {
                // Xử lý lỗi HTTP
            }
        });
}
//Hiển thị các phần thông tin khi từng thông tin được click chuột
qltk.onclick = function () {
    fetch("../../index.php/getUser")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                            chuoijson = ret.data;
                            them(chuoijson);
                        }
                        //  console.log(ret.status);
                    });
            }
        });
    // console.log(thongtinquanli);
}
//Tìm kiếm thông tin phần quản lí thông tin tài khoản
timkiemqltk.onclick = function () {
    console.log(iptimkiemqltk.value);

    fetch("../../index.php/searchUser",{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"search":"' + iptimkiemqltk.value  + '"}'
    })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                            console.log(ret.data);
                            chuoijson = ret.data;
                            them(chuoijson);
                        }
                    })
            }
        })


    iptimkiemqltk.value = "";
}
//Xử lí khi bấm vào phần hiển thị của quản lí bài đăng
qlbd.onclick = function () {
    htContent2.style.display = "block";
    htContent1.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
}
//Xử lí khi bấm vào phần hiển thị của nút thông báo
tb.onclick = function () {
    htContent3.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
}
//Xử lí khi bấm vào phần hiển thị của nút chat
chat.onclick = function () {
    htContent5.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
}
//Xử lí khi bấm vào phần hiển thị của nút thống kê phân tích xu hướng
tkpt.onclick = function () {
    htContent4.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent5.style.display = "none";
}
//Khi bấm nút thoát thì thoát khỏi tất cả phần hiển thị thông tin trở về màn hình chính
for (let i = 0; i <= 4; i++) {
    thoatndct[i].onclick = function () {
        htContent1.style.display = "none";
        htContent2.style.display = "none";
        htContent3.style.display = "none";
        htContent4.style.display = "none";
        htContent5.style.display = "none";
        for (let j = 0; j <= 3; j++) {
            giatritrang[j].value = 1;
        }
    }
}
//Sửa giá trị trang và hiển thị khi click vào nut tăng giảm bên cạnh số trang
for (let j = 0; j <= 3; j++) {
    giamsotrang[j].onclick = function () {
        if (giatritrang[j].value > 1)
            giatritrang[j].value--;
        if (j == 0) {
            them(chuoijson);//Hiển thị thông tin dựa vào số trang
        }
    }
}
for (let j = 0; j <= 3; j++) {
    tangsotrang[j].onclick = function () {
        // console.log(maxTrang);
        if (giatritrang[j].value < maxTrang) {
            giatritrang[j].value++;
        }
        if (j == 0) {
            them(chuoijson);//Hiển thị thông tin dựa vào số trang
        }
    }
}
//Hiển thị thông tin tài khoản sau khi đăng nhập
function createDisplayUser(userName, per) {

    let c1 = document.createElement("tr");
    var string1 = userName + " quyền: " + per;
    c1.innerHTML = string1;
    let r = document.getElementById("displayusename");
    if (r.childElementCount < 1) {
        r.appendChild(c1);

    }

}
//Xử lí khi nút sửa hoặc xóa trong phần hiển thị thông tin chi tiết được click
for (let i = 0; i < maxVongLap; i++) {
    nutSua[i].onclick = function () {
        console.log("Nút sửa thứ" + i + "được nhấn");
    }
}
//Hàm dùng để vẽ động khi nút quản lí tài khoản được click
function themthongtinhienthi(bienchay) {
    let theto = document.createElement("div");
    let chucnang = document.createElement("div");
    let nutsua = document.createElement("button");
    nutsua.classList = "Sua";
    nutsua.textContent = "Sửa";
    let nutxoa = document.createElement("button");
    nutxoa.classList = "Xoa";
    nutxoa.textContent = "Xóa";
    let hoten = document.createElement("div");
    let tendangnhap = document.createElement("div");
    let email = document.createElement("div");
    let sodienthoai = document.createElement("div");
    let diachi = document.createElement("div");
    let loaitaikhoan = document.createElement("div");
    chucnang.appendChild(nutsua);
    chucnang.appendChild(nutxoa);
    hoten.textContent = chuoi1[bienchay].user;
    tendangnhap.textContent = chuoi1[bienchay].name;
    email.textContent = chuoi1[bienchay].email;
    sodienthoai.textContent = chuoi1[bienchay].phoneNumber;
    diachi.textContent = chuoi1[bienchay].address;
    loaitaikhoan.textContent = chuoi1[bienchay].per;
    theto.appendChild(chucnang);
    theto.appendChild(hoten);
    theto.appendChild(tendangnhap);
    theto.appendChild(email);
    theto.appendChild(sodienthoai);
    theto.appendChild(diachi);
    theto.appendChild(loaitaikhoan);
    thongtinquanli.appendChild(theto);
}
//Thêm và vẽ thông tin 
function them(chuoijson) {
    //chuoijson = ret.data;
    chuoi1 = chuoijson;
    //console.log(chuoijson);
    htContent1.style.display = "block";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
    //Hiển thị thông tin các tài khoản
    maxTrang = parseInt(chuoijson.length / 10) + 1;
    maxVongLap = chuoijson.length;
    thongtinquanli.innerHTML = "";
    let sotrang = giatritrang[0].value - 1;
    // console.log(chuoijson.length);
    // console.log(maxTrang);
    for (let i = sotrang * 10; i < sotrang * 10 + 10; i++) {
        if (chuoi1[i] != null)
            themthongtinhienthi(i);
    }
    nutSua = document.getElementsByClassName("Sua");
    nutXoa = document.getElementsByClassName("Xoa");
    // console.log("đây là nút xóa");
    // console.log(nutXoa);
    //Các hành động được thực hiện khi nút sửa và xóa được nhấn
    for (let m = 0; m < 10; m++) {
        if (nutXoa[m] != null) {
            nutXoa[m].onclick = function () {
                console.log("Nut xóa " + m + "được nhấn");
                console.log("Trang được nhấn là :" + giatritrang[0].value);
                let phanTuDuocThaoTacXoa = m + (giatritrang[0].value - 1) * 10;
                console.log("Phần tử sẽ được xóa là : " + phanTuDuocThaoTacXoa);
            }
        }
        if (nutSua[m] != null) {
            nutSua[m].onclick = function () {
                console.log("Nút sửa" + m + "được nhấn");
                console.log("Trang được nhấn là :" + giatritrang[0].value);
                let phanTuDuocThaoTacSua = m + (giatritrang[0].value - 1) * 10;
                console.log("Phần tử sẽ được sửa là : " + phanTuDuocThaoTacSua);
            }
        }
    }
}