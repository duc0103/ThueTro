var user2 = document.getElementById("user2");
var pass2 = document.getElementById("pass2");
var email = document.getElementById("email");
var name2 = document.getElementById("name");

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
                            document.getElementById('id02').style.display='none';
                        }
                        else {
                            // Sai tên đăng nhập hoặc mật khẩu
                            alert("Email chưa chính xác hoặc tài khoản đã tồn tại !!!");
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