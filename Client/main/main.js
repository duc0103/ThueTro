var user2 = document.getElementById("user2");
var pass2 = document.getElementById("pass2");
var email = document.getElementById("email");
var name2 = document.getElementById("name");
// var btnLogin = document.getElementById("submitlogin");
var btnRes = document.getElementById("register");

 user2.values="";
 pass2.values="";
 email.values="";
 name2.values="";


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
