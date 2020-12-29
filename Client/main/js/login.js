var user = document.getElementById("user1");
var pass = document.getElementById("pass1");
var btnLogin = document.getElementById("login");
var checkThem;


btnLogin.onclick = function() {
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
                            // alert("Đăng nhập thành công ");
                            document.getElementById("btnRes").style.display="none";
                            document.getElementById("btnlogin").style.display="none";
                            document.getElementById("logout").style.display="inline-block";
                            document.getElementById("changePass").style.display="inline-block";
                            document.getElementById('id01').style.display='none';

                            // 
                            fetch("../../index.php/logged")
                                .then(resp2 => {
                                    if (resp2.status == 200) {
                                        resp2.json()
                                            .then(ret2 => {
                                                document.getElementById("nameUser").textContent=ret2.data[1];
                                                if (ret2.status == "OK") {
                                                    checkThem=ret.data;
                                                    if (ret2.data[0] == 1 && ret2.data[3]=="owner")  {
                                                        if(confirm("Bạn Là chủ trọ bạn có muốn vào trang quản lí")){
                                                            document.location.href = "../admin/admin.htm";
                                                        }
                                                       
                                                    }
                                                    if (ret2.data[0] == 1 && ret2.data[3]=="admin")  {
                                                        if(confirm("Bạn Là Admin bạn có muốn vào trang quản lí")){
                                                            document.location.href = "../admin/admin.htm";
                                                        }
                                                       
                                                    }
                                                }
                                                else{
                                                    checkThem="";
                                                }
                                            });
                                    }
                                });
                        }
                        else {
                            // Sai tên đăng nhập hoặc mật khẩu
                            alert("Sai tên tài khoản hoặc mật khẩu");
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
