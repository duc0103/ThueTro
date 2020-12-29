// let dn = document.getElementById("dn");//Nút đăng nhập
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
let thongtinquanli = document.getElementsByClassName("thongtinquanli");//Thẻ chứa nội dung thông tin quản lí tài khoản dữ liệu được lấy về từ backend
//let thongtinquanlibaidang = document.getElementById("thongtinquanlibaidang");
console.log(thongtinquanli);
let quanlithongbao = document.getElementById("quanlithongbao");
let quanlichat = document.getElementById("quanlichat");
var chuoijson = "";//Chuỗi json trả về dữ liệu phần quản lí thông tin tài khoản
let chuoi1 = "";//Chuyển chuoijson bên trên thành đối tượng
let nutXoa = "";//Chứa các nút xóa trong phần chức năng của hiển thị thông tin 
let nutSua = "";//Chứa các nút sửa trong phần chức năng của hiển thị thông tin 
let maxTrang = "";
let maxVongLap = "";
let timkiem = document.getElementsByClassName("timkiem");//Nút tìm kiếm trong phần quản lí thông tin tài khoản
let iptimkiem = document.getElementsByClassName("iptimkiem");//Thẻ input trong phần quản lí thông tin tài khoản
let chinhsuathongtin = document.getElementById("phanchuathongtintaikhoan");
//Khai báo các phần tử lưu thông tin trùng khớp
let theto = document.createElement("div");
let chucnang = document.createElement("div");
let nutsua = document.createElement("button");
let nutxoa = document.createElement("button");
let phanTuDuocThaoTacSua = "";
let giaTriSua = "";
let code_id = document.createElement("div");
let ip1 = document.createElement("div");
let ip2 = document.createElement("div");
let ip3 = document.createElement("div");
let ip4 = document.createElement("div");
let ip5 = document.createElement("div");
let ip6 = document.createElement("div");
let lbcode_id = document.createElement("label");
let lb1 = document.createElement("label");
let lb2 = document.createElement("label");
let lb3 = document.createElement("label");
let lb4 = document.createElement("label");
let lb5 = document.createElement("label");
let lb6 = document.createElement("label");
let ip11 = document.createElement("input");
let ip21 = document.createElement("input");
let ip31 = document.createElement("input");
let ip41 = document.createElement("input");
let ip51 = document.createElement("input");
let code_id1 = document.createElement("input");
let ip61 = document.createElement("select");
let ip611 = document.createElement("option");
let ip612 = document.createElement("option");
let thongtin = document.getElementById("tt1");
let sotrang = "";
let chuoivehtmlqlbd = "";
let chuoivehtmlqlbdSua = "";
let chuoiluuthongbao = "";
let chuoiluuchat = "";
let chuoiluuhienthichat = "";
let thoatChat = document.getElementById("thoatChat");
let htdnChat = document.getElementsByClassName("htdn")[1];
let htdnChat1 = document.getElementsByClassName("htdn1")[1];
console.log(timkiem[0]);
//Hiển thị sau khi load trang
window.onload = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
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
                            // dn.style.display = "none";
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
                                // dn.style.display = "block";
                                dx.style.display = "none";
                                document.location.href = "../main/index.htm";
                            }
                        }
                    });
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
                            console.log(chuoijson);
                            them(chuoijson, 0);
                        }
                        //  console.log(ret.status);
                    });
            }
        });
    // console.log(thongtinquanli);
}
//Tìm kiếm thông tin phần quản lí thông tin tài khoản
for (let i = 0; i < 4; i++) {
    timkiem[i].onclick = function () {
        console.log(iptimkiem[i].value);

        fetch("../../index.php/searchUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: '{"search":"' + iptimkiem[i].value + '"}'
        })
            .then(resp => {
                if (resp.status == 200) {
                    resp.json()
                        .then(ret => {
                            if (ret.status == "ok") {
                                console.log(ret.data);
                                chuoijson = ret.data;
                                giatritrang[i].value = 1;
                                them(chuoijson, i);
                            }
                        })
                }
            })

        iptimkiem[i].value = "";
    };
}
//Xóa tài khoản người dùng
function deleteUser(id_tenbaidang, nhandientrangxoa) {
    fetch("../../index.php/deleteUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"id":"' + id_tenbaidang + '"}'
    })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                            console.log(ret.data);
                            chuoijson = ret.data;
                            them(chuoijson, nhandientrangxoa);
                        }
                    })
            }
        })
}
function deleteRoom(id_tenbaidang, nhandientrangxoa) {
    fetch("../../index.php/deleteRoomById", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: '{"room_id":"' + id_tenbaidang + '"}'
    })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                            console.log(ret.data);
                            chuoijson = ret.data;
                            //them(chuoijson, nhandientrangxoa);
                            qlbd.click();
                        }
                    })
            }
        })
}


//Xử lí khi bấm vào phần hiển thị của quản lí bài đăng
qlbd.onclick = function () {
    // console.log("Chạy quản lí bài đăng");
    // themthongtinhienthi(0,1);
    //Lấy tất cả các phòng về 
    fetch("../../index.php/allRoomAdmin")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        // console.log(ret);
                        if (ret.status == "ok") {
                            //   luu.textContent="";
                            luudata = ret.data;
                            console.log(luudata);
                            chuoijson = luudata;
                            them(chuoijson, 1);
                            console.log("Đã bấm vào quản lí bài đăng");

                        } else {
                            alert("lấy dữ ko liệu thành công");
                        }
                    });
            } else {
                // Xử lý lỗi HTTP
            }
        });
    // chuoi1 = '[{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"},{"tenbaidang":"abc","thoigiandang":"12512","thoigianketthuc":"12223","tinhtrangpheduyet":"ahsuaw","chuquanlibaidang":"ahsa"}]';
    // // chuoi1 = "";
    // chuoijson = JSON.parse(chuoi1);
    // // console.log(chuoijson);
    // them(chuoijson, 1);
    // console.log("Đã bấm vào quản lí bài đăng");

}
//Xử lí khi bấm vào phần hiển thị của nút thông báo
tb.onclick = function () {
    htContent3.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
    chuoiluuthongbao = "";
    //Khi người dùng bấm vào nút thông báo toàn bộ thông báo ở bảng thông báo sẽ được trả về
    chuoi1 = '[{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa2"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài"},{"tennguoithaydoi":"Đức","noidungthaydoi":"Sửa"},{"tennguoithaydoi":"Đông","noidungthaydoi":"Đăng bài2"},{"tennguoithaydoi":"Đức1","noidungthaydoi":"Sửa"}]';
    chuoijson = JSON.parse(chuoi1);
    maxTrang = chuoijson.length / 8;
    sotrang = giatritrang[2].value - 1;
    for (let i = sotrang * 8; i < sotrang * 8 + 8; i++) {
        if (chuoijson[i] != null)
            chuoiluuthongbao += `<div>" ` + chuoijson[i].tennguoithaydoi + ` " đã " ` + chuoijson[i].noidungthaydoi + ` " : Chờ phê duyệt</div>`;
    }
    quanlithongbao.innerHTML = chuoiluuthongbao;
    console.log("Xin chào");
}
//Xử lí khi bấm vào phần hiển thị của nút chat
chat.onclick = function () {
    htContent5.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
    chuoiluuchat = "";
    fetch("../../index.php/getUser")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                            chuoijson = ret.data;
                            console.log(chuoijson);
                            maxTrang = chuoijson.length / 8;
                            sotrang = giatritrang[3].value - 1;
                            for (let i = sotrang * 8; i < sotrang * 8 + 8; i++) {
                                if (chuoijson[i] != null)
                                    chuoiluuchat += `<div class="userThongbao">Tài khoản : ` + chuoijson[i].user + `</div>`;
                            }
                            quanlichat.innerHTML = chuoiluuchat;
                            let nhanNguoiChat = document.getElementsByClassName("userThongbao");
                            for (let i = 0; i < 8; i++) {
                                if (nhanNguoiChat[i] != null) {
                                    nhanNguoiChat[i].onclick = function () {
                                        let phanTuDuocChon = i + (giatritrang[3].value - 1) * 8;
                                        console.log(nhanNguoiChat[i]);
                                        console.log(chuoijson[phanTuDuocChon]);

                                    }
                                }
                            }
                        }
                        //  console.log(ret.status);
                    });
            }
        });

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
            them(chuoijson, 0);//Hiển thị thông tin dựa vào số trang
        }
        else if (j == 1) {
            them(chuoijson, 1);//Hiển thị thông tin dựa vào số trang
        } else if (j == 2) {
            tb.click();
        } else if (j == 3) {
            chat.click();
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
            them(chuoijson, 0);//Hiển thị thông tin dựa vào số trang
        } else if (j == 1) {
            them(chuoijson, 1);//Hiển thị thông tin dựa vào số trang
        } else if (j == 2) {
            tb.click();
        } else if (j == 3) {
            chat.click();
        }
    }
}
//Hiển thị thông tin tài khoản sau khi đăng nhập
function createDisplayUser(userName, per) {

    let c1 = document.createElement("button");
    var string1 = userName;
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
function themthongtinhienthi(bienchay, luuthongtintrangnho1) {
    if (luuthongtintrangnho1 == 0) {
        console.log("chay voi bien trang thai la 0");
        theto = document.createElement("div");
        chucnang = document.createElement("div");
        nutsua = document.createElement("button");
        nutsua.classList = "Sua";
        nutsua.textContent = "Sửa";
        nutxoa = document.createElement("button");
        nutxoa.classList = "Xoa";
        nutxoa.textContent = "Xóa";
        let hoten = document.createElement("div");
        let tendangnhap = document.createElement("div");
        let email = document.createElement("div");
        let sodienthoai = document.createElement("div");
        let diachi = document.createElement("div");
        let loaitaikhoan = document.createElement("div");
        let luutambien = "";
        chucnang.appendChild(nutsua);
        chucnang.appendChild(nutxoa);
        hoten.textContent = chuoi1[bienchay].user;
        tendangnhap.textContent = chuoi1[bienchay].name;
        email.textContent = chuoi1[bienchay].email;
        sodienthoai.textContent = chuoi1[bienchay].phoneNumber;
        diachi.textContent = chuoi1[bienchay].address;
        if (chuoi1[bienchay].per == "owner") {
            luutambien = "Quản lí";
        } else if (chuoi1[bienchay].per == "render") {
            luutambien = "Tài khoản thường";
        }
        loaitaikhoan.textContent = luutambien;
        theto.appendChild(chucnang);
        theto.appendChild(hoten);
        theto.appendChild(tendangnhap);
        theto.appendChild(email);
        theto.appendChild(sodienthoai);
        theto.appendChild(diachi);
        theto.appendChild(loaitaikhoan);
        thongtinquanli[0].appendChild(theto);
    } else if (luuthongtintrangnho1 == 1) {//Thêm thông tin vào phần quản lí bài đăng
        // console.log("chay vs biến trạng thái bằng 1");
        let pheduyet = "";
        if(chuoijson[bienchay].public == 1 )
        {
            pheduyet = "Đã phê duyệt";
        }else if(chuoijson[bienchay].public == 0)
        {
            pheduyet = "Chờ phê duyệt";
        }
        chuoivehtmlqlbd = `
        <div>
            <div>
                <button class="Sua1">Sửa</button>
                <button class="Xoa1">Xóa</button>
            </div>
            <div>`+ chuoijson[bienchay].tenphong + `</div>
            <div>`+ chuoijson[bienchay].ngay_dang + `</div>
            <div>`+ chuoijson[bienchay].ngay_het_han + `</div>
            <div>`+ pheduyet + `</div>
            <div>`+ chuoijson[bienchay].name + `</div>
        </div>`;
        thongtinquanli[luuthongtintrangnho1].innerHTML += chuoivehtmlqlbd;
        // console.log(chuoivehtmlqlbd);
    }
}
//Hàm chứa các công việc thêm sửa xóa và vẽ thông tin 
function them(chuoijson, bienluutrangnho) {
    //chuoijson = ret.data;
    if (bienluutrangnho == 0) {
        chuoi1 = chuoijson;
        //console.log(chuoijson);
        htContent1.style.display = "block";
        htContent2.style.display = "none";
        htContent3.style.display = "none";
        htContent4.style.display = "none";
        htContent5.style.display = "none";
        //Hiển thị thông tin các tài khoản
        maxTrang = parseInt(chuoijson.length / 8) + 1;
        maxVongLap = chuoijson.length;
        thongtinquanli[bienluutrangnho].innerHTML = "";
        sotrang = giatritrang[bienluutrangnho].value - 1;
        for (let i = sotrang * 8; i < sotrang * 8 + 8; i++) {
            if (chuoi1[i] != null)
                themthongtinhienthi(i, bienluutrangnho);
        }
        nutSua = document.getElementsByClassName("Sua");
        nutXoa = document.getElementsByClassName("Xoa");
        //Phím chức năng xóa được chọn
        for (let m = 0; m < 8; m++) {
            if (nutXoa[m] != null) {
                nutXoa[m].onclick = function () {
                    console.log("Nut xóa " + m + "được nhấn");
                    console.log("Trang được nhấn là :" + giatritrang[bienluutrangnho].value);
                    let phanTuDuocThaoTacXoa = m + (giatritrang[bienluutrangnho].value - 1) * 8;
                    console.log("Phần tử sẽ được xóa là : " + phanTuDuocThaoTacXoa);
                    let giaTriXoa = chuoijson[phanTuDuocThaoTacXoa].user_id;//Chọn ra id của phần tử được xóa
                    if (confirm("Bạn chắc chắn muốn XÓA tài khoản : " + chuoijson[phanTuDuocThaoTacXoa].user + " ?"))
                    deleteUser(giaTriXoa, bienluutrangnho);//Xóa phần tử
                }
            }
            //Phím chức năng sửa được chọn
            if (nutSua[m] != null) {
                nutSua[m].onclick = function () {
                    chinhsuathongtin.innerHTML = "";
                    console.log("Nút sửa" + m + "được nhấn");
                    console.log("Trang được nhấn là :" + giatritrang[bienluutrangnho].value);
                    phanTuDuocThaoTacSua = m + (giatritrang[bienluutrangnho].value - 1) * 8;
                    console.log("Phần tử sẽ được sửa là : " + phanTuDuocThaoTacSua);
                    giaTriSua = chuoijson[phanTuDuocThaoTacSua].user_id;
                    htdn.style.display = "block";
                    htdn1.style.display = "block";
                    code_id = document.createElement("div");
                    ip1 = document.createElement("div");
                    ip2 = document.createElement("div");
                    ip3 = document.createElement("div");
                    ip4 = document.createElement("div");
                    ip5 = document.createElement("div");
                    ip6 = document.createElement("div");
                    ip1.classList = "thechua";
                    ip2.classList = "thechua";
                    ip3.classList = "thechua";
                    ip4.classList = "thechua";
                    ip5.classList = "thechua";
                    ip6.classList = "thechua";
                    code_id.classList = "thechua";
                    lbcode_id = document.createElement("label");
                    lb1 = document.createElement("label");
                    lb2 = document.createElement("label");
                    lb3 = document.createElement("label");
                    lb4 = document.createElement("label");
                    lb5 = document.createElement("label");
                    lb6 = document.createElement("label");
                    lb1.textContent = "User Name       : ";
                    lbcode_id.textContent = "Số CMT/CCCD     : ";
                    lb2.textContent = "Họ tên          : ";
                    lb3.textContent = "Email           : ";
                    lb4.textContent = "Số điện thoại   : ";
                    lb5.textContent = "Địa chỉ         : ";
                    lb6.textContent = "Loại tài khoản  : ";
                    ip1.appendChild(lb1);
                    ip2.appendChild(lb2);
                    ip3.appendChild(lb3);
                    ip4.appendChild(lb4);
                    ip5.appendChild(lb5);
                    ip6.appendChild(lb6);
                    code_id.appendChild(lbcode_id);
                    ip11 = document.createElement("input");
                    ip21 = document.createElement("input");
                    ip31 = document.createElement("input");
                    ip41 = document.createElement("input");
                    ip51 = document.createElement("input");
                    code_id1 = document.createElement("input");
                    ip61 = document.createElement("select");
                    ip611 = document.createElement("option");
                    ip611.value = "owner";
                    ip611.textContent = "Quản lí"
                    ip612 = document.createElement("option");
                    ip612.value = "render";
                    ip612.textContent = "Tài khoản thường";
                    ip61.appendChild(ip611);
                    ip61.appendChild(ip612);
                    ip1.appendChild(ip11);
                    ip2.appendChild(ip21);
                    ip3.appendChild(ip31);
                    ip4.appendChild(ip41);
                    ip5.appendChild(ip51);
                    ip6.appendChild(ip61);
                    code_id.appendChild(code_id1);
                    ip11.value = chuoijson[phanTuDuocThaoTacSua].user;
                    ip21.value = chuoijson[phanTuDuocThaoTacSua].name;
                    ip31.value = chuoijson[phanTuDuocThaoTacSua].email;
                    ip41.value = chuoijson[phanTuDuocThaoTacSua].phoneNumber;
                    ip51.value = chuoijson[phanTuDuocThaoTacSua].address;
                    ip61.value = chuoijson[phanTuDuocThaoTacSua].per;
                    thongtin.textContent = "Chỉnh sửa thông tin tài khoản";
                    code_id1.value = chuoijson[phanTuDuocThaoTacSua].code_id;
                    chinhsuathongtin.appendChild(ip1);
                    chinhsuathongtin.appendChild(code_id);
                    chinhsuathongtin.appendChild(ip2);
                    chinhsuathongtin.appendChild(ip3);
                    chinhsuathongtin.appendChild(ip4);
                    chinhsuathongtin.appendChild(ip5);
                    chinhsuathongtin.appendChild(ip6);

                    //click để cập nhật dữ liệu
                    nutdn.onclick = function () {
                        if (ip61.value == "owner" && (ip11.value == "" || ip21.value == "" || ip31.value == "" || ip41.value == "" || ip51.value == "" || code_id1.value == "")) {
                            alert("Nhập đầy đủ thông tin");
                        } else {
                            fetch("../../index.php/updateUser", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: '{"id":"' + chuoijson[phanTuDuocThaoTacSua].user_id +
                                    '","code_id":"' + code_id1.value +
                                    '","user":"' + ip11.value +
                                    '","name":"' + ip21.value +
                                    '","email":"' + ip31.value +
                                    '","phone":"' + ip41.value +
                                    '","address":"' + ip51.value +
                                    '","per":"' + ip61.value +
                                    '"}'
                            }).then(resp => {
                                if (resp.status == 200) {
                                    resp.json()
                                        .then(ret => {
                                            if (ret.status == "ok") {
                                                alert("Sửa thông tin thành công");
                                                htdn.style.display = "none";
                                                htdn1.style.display = "none";
                                                console.log(ret.data);
                                                chuoijson = ret.data;
                                                them(chuoijson, bienluutrangnho);
                                            }
                                            else {
                                                alert("Tên tài khoản hoặc Email đã tồn tại");
                                            }
                                        })
                                }
                            })
                        }
                    }
                    //Bấm nút xác nhận thì gửi các dữ liệu ở các thẻ ip11 , ip21 ... đến phần nutdn.onclick
                }
            }
        }
    } else if (bienluutrangnho == 1) {//Quản lí bài đăng
        // console.log(chuoijson[0].tenbaidang);
        htContent1.style.display = "none";
        htContent2.style.display = "block";
        htContent3.style.display = "none";
        htContent4.style.display = "none";
        htContent5.style.display = "none";
        //Hiển thị thông tin các tài khoản
        maxTrang = parseInt(chuoijson.length / 8) + 1;
        maxVongLap = chuoijson.length;
        thongtinquanli[bienluutrangnho].innerHTML = "";
        sotrang = giatritrang[bienluutrangnho].value - 1;
        for (let i = sotrang * 8; i < sotrang * 8 + 8; i++) {
            if (chuoijson[i] != null)
                themthongtinhienthi(i, bienluutrangnho);
        }
        nutSua = document.getElementsByClassName("Sua1");
        nutXoa = document.getElementsByClassName("Xoa1");
        console.log(nutXoa);
        //Phím chức năng xóa được chọn
        for (let m = 0; m < 8; m++) {
            if (nutXoa[m] != null) {
                nutXoa[m].onclick = function () {
                    console.log("Nut xóa " + m + "được nhấn");
                    console.log("Trang được nhấn là :" + giatritrang[bienluutrangnho].value);
                    let phanTuDuocThaoTacXoa = m + (giatritrang[bienluutrangnho].value - 1) * 8;
                    console.log("Phần tử sẽ được xóa là : " + phanTuDuocThaoTacXoa);
                    let giaTriXoa = chuoijson[phanTuDuocThaoTacXoa].room_id;//Chọn ra id của phần tử được xóa
                    if (confirm("Bạn chắc chắn muốn XÓA bài đăng có tên : " + chuoijson[phanTuDuocThaoTacXoa].tenphong + " ?"))
                    deleteRoom(giaTriXoa, bienluutrangnho);//Xóa phần tử
                }
            }
            //Phím chức năng sửa được chọn
            if (nutSua[m] != null) {
                nutSua[m].onclick = function () {
                    console.log("Nut sua" + m + "được nhấn");
                    console.log("Trang được nhấn là :" + giatritrang[bienluutrangnho].value);
                    phanTuDuocThaoTacSua = m + (giatritrang[bienluutrangnho].value - 1) * 8;
                    giaTriSua = chuoijson[phanTuDuocThaoTacSua].tenbaidang;
                    htdn.style.display = "block";
                    htdn1.style.display = "block";
                    thongtin.textContent = "Chỉnh sửa thông tin bài đăng";
                    chuoivehtmlqlbdSua = `
                    <div class="thechua">
                        <label>Tên bài đăng : </label>
                        <input value="`+ chuoijson[phanTuDuocThaoTacSua].tenbaidang + `">
                    </div>
                    <div class="thechua">
                        <label>Ngày hết hạn : </label>
                        <input value="`+ chuoijson[phanTuDuocThaoTacSua].thoigianketthuc + `">
                    </div>
                    <div class="thechua">
                        <label>Tình trạng phê duyệt : </label>
                        <select>
                            <option value="chopheduyet">Chờ phê duyệt</option>
                            <option value="dapheduyet">Đã phê duyệt</option>
                        </select>
                    </div>
                    `;
                    chinhsuathongtin.innerHTML = chuoivehtmlqlbdSua;
                    nutdn.onclick = function () {
                        console.log("Gửi thông tin lên sever");
                        console.log(chuoijson[phanTuDuocThaoTacSua]);
                    }
                }
            }
        }

    }
}

