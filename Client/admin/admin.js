let dn = document.getElementById("dn");
let dx = document.getElementById("dx");
let htdn = document.getElementsByClassName("htdn")[0];
let htdn1 = document.getElementsByClassName("htdn1")[0];
let thoat = document.getElementById("thoat");
let nutdn = document.getElementById("nutdn");
let user = document.getElementById("user");
let pass = document.getElementById("pass");
let qltk = document.getElementById("qltk");
let qlbd = document.getElementById("qlbd");
let tb = document.getElementById("tb");
let tkpt = document.getElementById("tkpt");
let chat = document.getElementById("chat");
let htContent1 = document.getElementById("htContent1");
let htContent2 = document.getElementById("htContent2");
let htContent3 = document.getElementById("htContent3");
let htContent4 = document.getElementById("htContent4");
let htContent5 = document.getElementById("htContent5");
let thoatndct = document.getElementsByClassName("thoat1");
let giamsotrang = document.getElementsByClassName("giam");
let tangsotrang = document.getElementsByClassName("tang");
let giatritrang = document.getElementsByClassName("giatri");
let thongtinquanli = document.getElementById("thongtinquanli");

let chuoijson = "";
let chuoi1="";

window.onload = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
dn.onclick = function () {
    htdn.style.display = "block";
    htdn1.style.display = "block";
    user.value = "";
    pass.value = "";
}
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
    //
    dx.onclick = function () {
        fetch("../../index.php/logout")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                .then(ret => {
                    if (ret.status == "OK") {
                        if (ret.data == 1) {
                            dn.style.display = "block";
                            dx.style.display="none";
                        }
                    }
                }); 
            }
        });
        }
    // Người dùng bấm nút "Đăng nhập"
    nutdn.onclick = function() {
        fetch("../../index.php/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
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
                                alert("sai ten tai khoan hoac mat khau");
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
                        chuoijson=ret.data;
                        console.log(chuoijson);
                        htContent1.style.display = "block";
                        htContent2.style.display = "none";
                        htContent3.style.display = "none";
                        htContent4.style.display = "none";
                        htContent5.style.display = "none";
                        //Hiển thị thông tin các tài khoản
                        thongtinquanli.innerHTML = "";
                        let sotrang = giatritrang[0].value - 1;
                        console.log("Đây là giá trị trang");
                        console.log(giatritrang[0]);
                        for (let i = sotrang * 10; i < sotrang * 10 + 10; i++) {
                            if(chuoi1[i]!=null)
                            themthongtinhienthi(i);
                        }
                    }
                    //  console.log(ret.status);
                }); 
            }
        });
        
  
    // console.log(thongtinquanli);
}
qlbd.onclick = function () {
    htContent2.style.display = "block";
    htContent1.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
}
tb.onclick = function () {
    htContent3.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent4.style.display = "none";
    htContent5.style.display = "none";
}
tkpt.onclick = function () {
    htContent4.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent5.style.display = "none";
}
chat.onclick = function () {
    htContent5.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
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
//Vòng lặp tăng giảm giá trị của số trang
for (let j = 0; j <= 3; j++) {
    giamsotrang[j].onclick = function () {
        if (giatritrang[j].value > 1)
            giatritrang[j].value--;
        thongtinquanli.innerHTML = "";
        let sotrang = giatritrang[j].value - 1;
        for (let i = sotrang * 10; i < sotrang * 10 + 10; i++) {
            if(chuoi1[i]!=null)
            themthongtinhienthi(i);
        }
    }
}
for (let j = 0; j <= 3; j++) {
    tangsotrang[j].onclick = function () {
        giatritrang[j].value++;
        thongtinquanli.innerHTML = "";
        let sotrang = giatritrang[j].value - 1;
        for (let i = sotrang * 10; i < sotrang * 10 + 10; i++) {
            if(chuoi1[i]!=null)
            themthongtinhienthi(i);
        }
    }
}
function createDisplayUser(userName, per) {

    let c1 = document.createElement("tr");
    var string1 = userName + " quyền: " + per;
    c1.innerHTML = string1;
    let r = document.getElementById("displayusename");
    if (r.childElementCount < 1) {
        r.appendChild(c1);

    }

}
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
    let loaitaikhoan = document.createElement("div");
    chucnang.appendChild(nutsua);
    chucnang.appendChild(nutxoa);
    hoten.textContent = chuoi1[bienchay].tdn;
    tendangnhap.textContent = chuoi1[bienchay].userName;
    email.textContent = chuoi1[bienchay].email;
    sodienthoai.textContent = chuoi1[bienchay].sdt;
    loaitaikhoan.textContent = chuoi1[bienchay].tt;
    theto.appendChild(chucnang);
    theto.appendChild(hoten);
    theto.appendChild(tendangnhap);
    theto.appendChild(email);
    theto.appendChild(sodienthoai);
    theto.appendChild(loaitaikhoan);
    thongtinquanli.appendChild(theto);
}
