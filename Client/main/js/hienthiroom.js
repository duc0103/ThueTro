fetch("../../index.php/allRoom")
.then(resp => {
    if (resp.status == 200) {
        resp.json()
            .then(ret => {
                console.log(ret);
                if (ret.status == "ok") {

                   alert("lấy dữ liệu thành công");
                    console.log(ret.data);
                } else {
                    alert("lấy dữ ko liệu thành công");

                }
            });
    } else {
        // Xử lý lỗi HTTP
    }
});
