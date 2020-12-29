let luu = document.getElementById("luuthongtinnhatro");
let luu1 = document.getElementById("luuthongtinnhatroaaa");

let luudata ="";
let chuoixuli ="";
let diadiem ="";
let tenphong ="";
let noidungmota ="";
let giatien ="";
let hinhanh ="";
let chuoi ="";
let room_id = "";

let chuoiluuthongtinchitiet ="";
fetch("../../index.php/allRoom")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    // console.log(ret);
                    if (ret.status == "ok") {

                        luudata = ret.data;
                        // console.log(luudata);
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
                    <a href="#" class="aa-secondary-btn" onclick = "xemchitiet(`+ room_id+ `)" >Xem chi tiết</a>
                  </div>
                </div>
              </article>
            </div>`;
    return chuoixuli;
}
function xemchitiet(room_id)
{
    for(let i =0 ; i<luudata.length;i++)
    {
        if(luudata[i].room_id == room_id)
        {
            console.log(luudata[i]);
            let chuoibancong ="";
            if(luudata[i].ban_cong == 1)
            {
                chuoibancong = "Có";
            }else{
                chuoibancong = "Không";
            }
            chuoiluuthongtinchitiet = `<div class="container">
            <div class="row">
              <div class="col-md-8">
                <div class="aa-properties-content">
                  <div class="aa-properties-details">
                    <div class="aa-properties-details-img">
                      <img src="img/item/`+ luudata[i].image[0] +`.jpg" alt="img">
                      <img src="img/item/`+ luudata[i].image[1] +`.jpg" alt="img">
                      <img src="img/item/`+ luudata[i].image[2] +`.jpg" alt="img">
                    </div>
                    <div class="aa-properties-info">
                      <h2>` + luudata[i].tenphong + `</h2>
                      <span class="aa-price">`+ luudata[i].gia_thue + `.đ</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
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
            </div>
          </div>`;      
          luu1.innerHTML = chuoiluuthongtinchitiet;
        }
    }
}

