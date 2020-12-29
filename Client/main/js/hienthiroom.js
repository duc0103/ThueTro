var luu = document.getElementById("luuthongtinnhatro");
var luu1 = document.getElementById("luuthongtinnhatroaaa");

// document.getElementById("a");
var bien = "";
var bientanganh =0;
var bienluu_room_id = "";
var bienluu_id_chutro = "";
var luudata ="";
var chuoixuli ="";
var diadiem ="";
var tenphong ="";
var noidungmota ="";
var giatien ="";
var hinhanh ="";
var chuoi ="";
var room_id = "";
var user_id=0;
var name_user="";
var user_id_chothue="";

let nameChuTro="";
let phoneChuTro="";
let mailChutro="";

var chuoiluuthongtinchitiet ="";
fetch("../../index.php/allRoom")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    // console.log(ret);
                    if (ret.status == "ok") {
                      luu.textContent="";
                        luudata = ret.data;
                        console.log(luu.textContent+"bien này");
                        for(let i=0;i<luudata.length;i++)
                        {
                            luu.innerHTML += xulidulieu(luudata,i);
                        }

                    } else {
                        alert("lấy dữ ko liệu thành công");
                    }
                });
        } else {
            // Xử lý lỗi HTTP
        }
    });
// for(let i=0;i<=luudata.length;i++)
// {
//     xemthongtinhchitiet[i]
// }
function xulidulieu(luudata,i)
{

    diadiem = luudata[i].address;
    tenphong = luudata[i].tenphong;
    noidungmota = luudata[i].loai_phong + '<br>' + luudata[i].phong_bep;
    giatien = luudata[i].gia_thue;
    hinhanh = luudata[i].image[0];
    room_id = luudata[i].room_id;
    
    user_id_chothue=luudata[i].owners_Id;
    chuoixuli = `<div class="col-md-4">
              <article class="aa-properties-item">
                <a href="#" class="aa-properties-item-img">
                  <img width="370" height="220" src="img/item/`
                  + hinhanh + `.jpg" alt="img">
                </a>
                <div class="aa-tag for-sale">
                  Hot
                </div>
                <div class="aa-properties-item-content">
                  <div class="aa-properties-info"> ` +
                    diadiem +
                  `</div>
                  <div class="aa-properties-about">
                    <h3><a href="#">`+tenphong+`</a></h3>
                    <p>`+ noidungmota +`</p>
                  </div>
                  <div class="aa-properties-detial">
                    <span class="aa-price">`+
                      giatien +`.đ
                    </span>
                   <a class="aa-secondary-btn" onclick = "xemchitiet(`+ room_id+ `,`+ user_id_chothue+`)" >Xem chi tiết </a>
                  </div>
                </div>
              </article>
            </div>`;
    return chuoixuli;
}
function xemchitiet(room_id,user_id_chothue)
{

  // hiển thị chi tiết về phòng
  
    for(let i =0 ; i<luudata.length;i++)
    {
        if(luudata[i].room_id == room_id)
        {
          fetch("../../index.php/GetUserbyID", { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: '{"user_id":"' + user_id_chothue + 
          '"}'
          })
          .then(resp => {
            if (resp.status == 200) {
                resp.json()
                    .then(ret => {
                        if (ret.status == "ok") {
                           nameChuTro=ret.name;
                           phoneChuTro=ret.phone;
                           mailChutro=ret.email;
                           console.log(luudata[i]);
                           let chuoibancong ="";
                           fetch("../../index.php/doComment", {
                            method: "POST",
                            headers: {"Content-Type": "application/json"},
                            body: '{"room_id":"' + room_id + '"}'
                           })
                            .then(resp2 => {
                                if (resp2.status == 200) {
                                    resp2.json()
                                        .then(ret2 => {
                                            if (ret2.status == "ok" ) {
                                              console.log(ret2.data);
                                              let hienthibinhluan="";
                                              // them binh luan
                                              for(let a=0;a<ret2.data.length;a++){
                                                hienthibinhluan+=`<div class="row">
                                                <div class="col-md-2 ">`+ret2.data[a]["name"]+`</div>
                                                <div class="col-md-7 ">`+ret2.data[a]["content"]+`</div>
                                              </div>`
                                              }
                                              if(luudata[i].ban_cong == 1)
                                              {
                                                  chuoibancong = "Có";
                                              }else{
                                                  chuoibancong = "Không";
                                              }
                                              bien = i;
                                              bienluu_room_id = luudata[i].room_id;
                                              bienluu_id_chutro = luudata[i].owners_Id;
                                              let image = luudata[i].image[bientanganh];
                                              //xu li phan hien tat ca cac anh
                                              chuoiluuthongtinchitiet = `<div class="container" id="addcommentbox">
                                              <div class="row">
                                                <div class="col-md-8">
                                                  <div class="aa-properties-content">
                                                    <div class="aa-properties-details">
                                                      <div class="aa-properties-details-img">
                                                      <img src="img/item/`+image+`.jpg" alt="img"></img>
                                                      </div>
                                                      <div class="aa-properties-info">
                                                      <button onclick="doianh(luudata,bien,bienluu_room_id,bienluu_id_chutro)">Ảnh khác</button>
                                                        <h2>` + luudata[i].tenphong + `</h2>
                                                        <span class="aa-price">`+ luudata[i].gia_thue + `.đ</span>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                                <div class="col-md-4">
                                                   <div class="row">
                                                    <h2>Thông tin chi tiết</h2><br>
                                                    <p>Địa điểm : `+ luudata[i].address +`</p>
                                                    <p>Ban công : `+ chuoibancong+`</p>
                                                    <p>Giá điện : `+ luudata[i].gia_dien +`.đ/1 số</p>
                                                    <p>Giá nước : `+ luudata[i].gia_nuoc +`.đ/1 khối</p>
                                                    <p>Loại : `+ luudata[i].loai_phong+`</p>
                                                    <p>Mô tả : `+ luudata[i].mo_ta+`</p>
                                                    <p>Ngày đăng : `+luudata[i].ngay_dang+`</p>
                                                    <p>Ngày hết hạn : `+luudata[i].ngay_het_han+`</p>
                                                    <p>Bếp : `+ luudata[i].phong_bep +`</p>
                                                    <p>Phòng tắm : `+ luudata[i].phong_tam +`</p>
                                                   </div>
                                                   <div class="row">
                                                   <h2>Thông tin liên hệ</h2><br>
                                                   <p>Số điện thoại: `+phoneChuTro+`</p>
                                                   <p>email : `+mailChutro+`</p>
                                                   <p>Họ tên : `+nameChuTro+`</p>
                                                   </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row">   
                                            <h2 id="fh2">Bình Luận Và Đánh giá</h2>
                                            </div>
                                            <div class="row">
                                              <div class="col-md-4 inputGroupContainer">
                                                <div class="pinfo">Đánh Giá</div>
                                                <div class="input-group">
                                                  <span class="input-group-addon"><i class="fa fa-heart"></i></span>
                                                  <select id="rate">
                                                    <option value="1star">1</option>
                                                    <option value="2stars">2</option>
                                                    <option value="3stars">3</option>
                                                    <option value="4stars">4</option>
                                                    <option value="5stars">5</option>
                                                  </select>
                                                </div>
                                              </div>
                                            </div>
                                            <div class="row">
                                              <div class="col-md-8 inputGroupContainer">
                                              <div class="input-group">
                                                  <span class="input-group-addon"><i class="fa fa-pencil"></i></span>
                                                  <textarea id="comment" class="form-control" id="review" width="100%" rows="3"></textarea>
                                                </div>
                                              </div>
                                              <button type="submit" onclick="addComment(`+room_id+`)" class="col-md-1 btn btn-primary">Gửi</button>
                                              </div>
                                              `+ hienthibinhluan+`</div>
                                            </div>
                                          </div>
                                          
                                         `;     
                                            luu.textContent=""; 
                                            luu.innerHTML = chuoiluuthongtinchitiet; 
                                            }
                                        });
                                }
                            });
                          
                        } 
                    });
            } 
          });

            
        }
    }
    //xem id user dang su dung

    
   
    console.log("datapphan add commit"+user_id);

}
function addComment(room_id){

  fetch("../../index.php/logged")
  .then(resp2 => {
      if (resp2.status == 200) {
          resp2.json()
              .then(ret2 => {
                  document.getElementById("nameUser").textContent=ret2.data[1];
                  if (ret2.status == "OK" ) {
                    console.log(ret2.data)+"data";
                    user_id=ret2.data[4];
                    
                      // nếu click thì ấn nút
                        console.log(document.getElementById("comment").value+"value");
                        fetch("../../index.php/addComment", { 
                          method: "POST",
                          headers: {"Content-Type": "application/json"},
                          body: '{"user_id":"' + user_id + 
                          '","room_id":"' + room_id + 
                          '","content":"' + document.getElementById("comment").value + 
                        '"}'
                        })
                        .then(resp => {
                          if (resp.status == 200) {
                              resp.json()
                                  .then(ret => {
                                    console.log("comment"+ret.data[0]["content"]);
                                      if (ret.status == "ok") {
                                        document.getElementById("comment").value=""; 
                                        document.getElementById( "addcommentbox").innerHTML+=

                                        ` <div class="row">
                                        <div class="col-md-2 ">`+ret.data[0]["name"]+`</div>
                                        <div class="col-md-7 ">`+ret.data[0]["content"]+`</div>
                                      </div>`  ;

                                      } 
                                  });
                          } 
                        });
                      
                      if (ret2.data[0] == 1 && ret2.data[3]=="admin")  {
                          document.location.href = "../admin/admin.htm";
                      }
                  }
              });
      }
  });
}
function doianh(hamluudulieu,bien,bienluu_room_id1,bienluu_id_chutro1)
{
  if(bientanganh < hamluudulieu[bien].image.length-1)
  {
    bientanganh += 1;
  }
  else{
    bientanganh = 0;
  }
  if(xemchitiet(bienluu_room_id1,bienluu_id_chutro1)!=null)
  {
    xemchitiet(bienluu_room_id1,bienluu_id_chutro1).click();
  }
}

