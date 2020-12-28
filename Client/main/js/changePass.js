var pass3= document.getElementById("pass3");
var newpass=document.getElementById("newpass");

function changPass() {
    fetch("../../index.php/changePass", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: '{"pass":"' + pass3.value + 
            '","newpass":"' + newpass.value + '"}'
    })
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok" ) {
                            if (ret.data ) {
                                alert("thay đổi mật khẩu t thafh công");
                                document.getElementById("btnlogin").style.display="inline-block";
                                document.getElementById("btnRes").style.display="inline-block";   
                            }
                        }
                    });
            }
        });
}