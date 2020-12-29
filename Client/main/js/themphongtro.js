var nameroom = document.getElementById("nameRoom");
var bancong = document.getElementById("bancong");
var nonglanh = document.getElementById("nonglanh");
var phongtam = document.getElementById("phongtam");
var chungchu = document.getElementById("chungchu");
var giaphong = document.getElementById("giaphong");
var giadien = document.getElementById("giadien");
var roomtype = document.getElementById("typeRoom");
var gianuoc = document.getElementById("gianuoc");
var bep = document.getElementById("bep");
var time = document.getElementById("time");
var mota = document.getElementById("mota");
var anh1 = document.getElementById("image1").files[0];
var anh2 = document.getElementById("image2").files[0];;
var anh3 = document.getElementById("image3").files[0];;
var road = document.getElementById("road");



var tinh = document.getElementById("tinh");
var huyen = document.getElementById("huyen");
var xa=document.getElementById("xa");
var AddRoom = document.getElementById("AddRoom");

var tinhdata="";
var huyendata="";
var xadata="";

//cac bien in ra noi dung

//xử lí nhập cái tài khoản
fetch("../../index.php/getTinh")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    console.log(ret);
                    if (ret.status == "ok") {
                        tinhdata=ret.data;
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
     tinh.onchange=function(){
    fetch("../../index.php/getHuyen")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "ok") {
                        xa.textContent="";
                        huyen.textContent="";
                        xa.innerHTML=`<option value="0" selected>Xã</option>`;
                        huyen.innerHTML=`<option value="0" selected>Huyện</option>`;
                        huyendata=ret.data;
                        let data=getHuyen(tinhdata,huyendata,tinh.value);
                        for(var i=0;i<data.length;i++) 
                        {
                            huyen.innerHTML+=`<option  >`+data[i]+` </option>`;
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
     huyen.onchange=function(){
    fetch("../../index.php/getXa")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "ok") {
                        xa.textContent=`<option value="0" selected>xa</option>`;
                        xadata=ret.data;
                        let data= getXa(huyendata,xadata,huyen.value);
                        for(var i=0;i<data.length;i++) 
                        {
                            xa.innerHTML+=`<option  >`+data[i]+` </option>`;
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
    var matp="";
    var a=[];
    for(var i=0;i<tinh.length;i++)
    {
        if(value == tinh[i]["name"])
        {
            matp=tinh[i]["matp"]
        }
    }
    for(var i=0;i<huyen.length;i++)
    {
        if(huyen[i]["matp"] == matp){
            a.push(huyen[i]["name"]);
        }
    }
    return a;

}
function getXa(huyen,xa,value){
    var maqh="";
    var a=[];
    for(var i=0;i<huyen.length;i++)
    {
        if(value==huyen[i]["name"])
        {
            maqh=huyen[i]["maqh"]
        }
    }
    for(var i=0;i<xa.length;i++)
    {
        if(xa[i]["maqh"] == maqh){
            a.push(xa[i]["name"]);
        }
    }
    return a;

}
AddRoom.onclick=function(){
  
    const form = new FormData();
    const file1 = document.getElementById('image1').files[0];
    const file2 = document.getElementById('image2').files[0];
    const file3 = document.getElementById('image3').files[0];
    form.append('upfile', file1);
    form.append('upfile2', file2);
    form.append('upfile3', file3);
    const request = new Request("../../controllers/imageController.php", {
        method: 'POST',
        body: form 
      });
      fetch(request).then(
          
      )
    
}
