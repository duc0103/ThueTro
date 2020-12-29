//xử lí data phần selection
console.log(luu+"bien ben hien thi room");
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

//cac bien in ra noi dung
var luu = document.getElementById("luuthongtinnhatro");
var luu1 = document.getElementById("luuthongtinnhatroaaa");

var luudata ="";
var chuoixuli ="";
var diadiem ="";
var tenphong ="";
var noidungmota ="";
var giatien ="";
var hinhanh ="";
var chuoi ="";
var room_id = "";
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
                        luudata = ret.data;
                        luu.textContent="";
                        // console.log(luudata);
                        for(let i=0;i<luudata.length;i++)
                        {
                            luu.innerHTML += xulidulieu(luudata,i);
                        }                       } else {
                    }
                });
        } else {
            // Xử lý lỗi HTTP
        }
    });
}

// for(let i=0;i<=luudata.length;i++)
// {
//     xemthongtinhchitiet[i]
// }
// function xulidulieu2(luudata,i)
// {
//     diadiem = luudata[i].address;
//     tenphong = luudata[i].tenphong;
//     noidungmota = luudata[i].loai_phong + '<br>' + luudata[i].phong_bep;
//     giatien = luudata[i].gia_thue;
//     hinhanh = luudata[i].image[0];
//     room_id = luudata[i].room_id;
//     chuoixuli = `<div class="col-md-4">
//               <article class="aa-properties-item">
//                 <a href="#" class="aa-properties-item-img">
//                   <img width="370" height="220" src="img/item/`
//                   + hinhanh + `.jpg" alt="img">
//                 </a>
//                 <div class="aa-tag for-sale">
//                   Hot
//                 </div>
//                 <div class="aa-properties-item-content">
//                   <div class="aa-properties-info"> ` +
//                     diadiem +
//                   `</div>
//                   <div class="aa-properties-about">
//                     <h3><a href="#">`+tenphong+`</a></h3>
//                     <p>`+ noidungmota +`</p>
//                   </div>
//                   <div class="aa-properties-detial">
//                     <span class="aa-price">`+
//                       giatien +`.đ
//                     </span>
//                     <a href="#" class="aa-secondary-btn" onclick = "xemchitiet(`+ room_id+`,`+ `)" >Xem chi tiết</a>
//                   </div>
//                 </div>
//               </article>
//             </div>`;
//     return chuoixuli;
// }
