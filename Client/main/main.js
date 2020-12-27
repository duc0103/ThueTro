var user2 = document.getElementById("user2");
var pass2 = document.getElementById("pass2");

var user2 = document.getElementById("user2");
var pass2 = document.getElementById("pass2");
var email = document.getElementById("email");
var name2 = document.getElementById("name");

var btnLogin = document.getElementById("login");
var btnRes = document.getElementById("register");

 


btnRes.onclick=function(){
        fetch("../../index.php/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: '{"user":"' + user2.value + 
                '","pass":"' + pass2.value + 
                '","name":"'  +name2.value+
                '","email":"' +email.value +
                '", "submitRegister":"1"}'
        })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "OK") {
                            if (ret.data == 1) {
                                document.getElementById('id02').style.display='none';
                                user2.values="";
                                pass2.values="";
                                email.values="";
                                name2.values="";
                                alert("Đăng kí thành công ");
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
// người dùng đã đăng nhập
fetch("../../index.php/logged")
.then(resp2 => {
    if (resp2.status == 200) {
        resp2.json()
            .then(ret2 => {
                if (ret2.status == "OK") {
                    if (ret2.data[0] == 1) {
                        // // console.log(ret2.data[1],ret2.data[2]);
                        // htdn.style.display = "none";
                        // htdn1.style.display = "none";
                        // dn.style.display = "none";
                        // createDisplayUser(ret2.data[1], ret2.data[3]);
                        alert("bạn đã đăng nhập thành công")
                    }
                }
            });
    }
});

btnLogin.onclick = function() {
    fetch("../../index.php/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: '{"user":"' + user1.value + 
            '","pass":"' + pass1.value + '", "loginSubmitted":"1"}'
    })
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "OK") {
                        if (ret.data == 1) {
                            // Đăng nhập thành công
                            alert("Đăng nhập thành công ");
                            
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