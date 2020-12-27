// người dùng đã đăng nhập
fetch("../../index.php/logged")
.then(resp2 => {
    if (resp2.status == 200) {
        resp2.json()
            .then(ret2 => {
                if (ret2.status == "OK") {
                    document.getElementById("btnlogin").style.display="none";
                    document.getElementById("btnRes").style.display="none";   
                    if (ret2.data[0] == 1 && ret2.data[3]=="admin") {
                        alert("bạn đã đăng nhập thành công");
                        document.location.href = "../admin/admin.htm";
                    }   
                }
            });
    }
});

// var modal1 = document.getElementById('id01');
// var modal2 = document.getElementById('id02');
// var modal3 = document.getElementById('id03');

// window.onclick = function(event) {
//     if (event.target == modal1) {
//         modal1.style.display = "none";
//     }
// }
// window.onclick = function(event) {
//     if (event.target == modal2) {
//         modal2.style.display = "none";
//     }
// }
// window.onclick = function(event) {
//     if (event.target == modal3) {
//         modal3.style.display = "none";
//     }
// }