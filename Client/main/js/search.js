var roomtype = document.getElementById("typeRoom");
var tinh = document.getElementById("tinh");
var huyen = document.getElementById("huyen");
var xa = document.getElementById("xa");
var tinhtdata="";
var huyendata="";
var xadata="";

//xử lí nhập cái tài khoản
fetch("../../index.php/getTinh")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    console.log(ret);
                    if (ret.status == "ok") {
                        tinhtdata=ret.data;
                        for(var i=0;i<ret.data.length;i++) 
                        {
                            tinh.innerHTML+=`<option  >`+ret.data[i]["name"]+` </option>`;
                        }    
                                

                    } else {
                        alert("lấy dữ ko liệu thành công");
                    }
                });
        } else {
            // Xử lý lỗi HTTP
        }
    });
    // tinh.onchange=function(){
    //     console.log(tinh.value)
    // }


    tinh.onchange=function(){
    fetch("../../index.php/getHuyen")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "ok") {
                        huyendata=ret.data;
                        for(var i=0;i<ret.data.length;i++) 
                        {
                            if(ret.data[i][matp]==tinh.value)
                            {
                                huyen.innerHTML+=`<option  >`+ret.data[i]["name"]+` </option>`;

                            }
                        }            
                    } else {
                        alert("lấy dữ ko liệu thành công");
                    }
                });
        } else {
            // Xử lý lỗi HTTP
        }
    });
}
function getHuyen(tinh,huyen,value){


}