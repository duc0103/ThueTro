function logout() {
    fetch("../../index.php/logout")
        .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "OK") {
                            if (ret.data == 1) {
                                alert("đã đăng xuất");
                                document.getElementById("btnlogin").style.display="inline-block";
                                document.getElementById("btnRes").style.display="inline-block";   
                            }
                        }
                    });
            }
        });
}