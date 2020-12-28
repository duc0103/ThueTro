let luu = document.getElementById("luuthongtinnhatro");
let luudata ="";
let chuoixuli ="";
let diadiem ="";
let tenphong ="";
let noidungmota ="";
let giatien ="";
let hinhanh ="";
let chuoi ="";
let room_id = "";
let xemthongtinhchitiet = document.getElementById("abc");
console.log(xemthongtinhchitiet);
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
        }
    }
}
