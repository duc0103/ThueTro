//xử lí data phần selection
var roomtype = document.getElementById("typeRoom");
var tinh = document.getElementById("tinh");
var huyen = document.getElementById("huyen");
var btnSub = document.getElementById("submitSearch");
var road = document.getElementById("road");
var priceMin = document.getElementById("priceMin");
var priceMax = document.getElementById("priceMax");
var SMin = document.getElementById("SMin");
var SMax = document.getElementById("SMax");

var tinhdata="";
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
// click nút tìm kiếm
btnSub.onclick=function(){
    console.log('{"road":"' + road.value + 
    '","loai_phong":"' + roomtype.value + 
    '","tinh":"'  +tinh.value+
    '","huyen":"'  +huyen.value+
    '","xa":"'  +xa.value+
    '","priceMin":"'  +priceMin.value+
    '","priceMax":"' +priceMax.value +
    '","Smin":"'  +SMin.value+
    '","smax":"' +SMax.value +
    '"}')
    fetch("../../index.php/searchRoom", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: '{"road":"' + road.value + 
            '","loai_phong":"' + roomtype.value + 
            '","tinh":"'  +tinh.value+
            '","huyen":"'  +huyen.value+
            '","xa":"'  +xa.value+
            '","priceMin":"'  +priceMin.value+
            '","priceMax":"' +priceMax.value +
            '","Smin":"'  +SMin.value+
            '","smax":"' +SMax.value +
            '"}'
    })
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    if (ret.status == "ok") {
                        console.log(ret.data);
                    } else {
                    }
                });
        } else {
            // Xử lý lỗi HTTP
        }
    });
}