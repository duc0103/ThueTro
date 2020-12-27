// người dùng đã đăng nhập
fetch("../../index.php/logged")
.then(resp2 => {
    if (resp2.status == 200) {
        resp2.json()
            .then(ret2 => {
                if (ret2.status == "OK") {
                    if (ret2.data[0] == 1) {
                        alert("bạn đã đăng nhập thành công");
                    }
                }
            });
    }
});