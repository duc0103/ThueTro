
let luu = document.getElementById("luuthongtinnhatro");
let luudata ="";
let chuoixuli ="";
let diadiem ="";
let tenphong ="";
let noidungmota ="";
let giatien ="";
let hinhanh ="";
let chuoi ="";
fetch("../../index.php/allRoom")
    .then(resp => {
        if (resp.status == 200) {
            resp.json()
                .then(ret => {
                    console.log(ret);
                    if (ret.status == "ok") {

                        luudata = ret.data;
                        console.log(luudata[0]);
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
function xulidulieu(luudata,i)
{
    diadiem = luudata[i].address;
    tenphong = luudata[i].tenphong;
    noidungmota = luudata[i].loai_phong + "" + luudata[i].phong_bep;
    giatien = luudata[i].gia_thue;
    hinhanh = luudata[i].image[0];
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
                      giatien +`
                    </span>
                    <a href="#" class="aa-secondary-btn">Xem chi tiết</a>
                  </div>
                </div>
              </article>
            </div>`;
    return chuoixuli;
}


