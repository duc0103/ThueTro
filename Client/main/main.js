// người dùng đã đăng nhập
document.getElementById("logout").style.display="none";
document.getElementById("changePass").style.display="none"; 
fetch("../../index.php/logged")
.then(resp2 => {
    if (resp2.status == 200) {
        resp2.json()
            .then(ret2 => {
                if (ret2.status == "OK") {
                  document.getElementById("btnRes").style.display="none";
                  document.getElementById("btnlogin").style.display="none";
                  document.getElementById("logout").style.display="inline-block";
                  document.getElementById("changePass").style.display="inline-block"; 
                    if (ret2.data[0] == 1 && ret2.data[3]=="admin") {
                        alert("bạn đã đăng nhập thành công");
                      
                        document.location.href = "../admin/admin.htm";
                    }   
                }   
            });
    }
});

var dataType = 'HELLO';
var htmlBlock = ` <div class="col-md-4">
<article class="aa-properties-item">
  <a href="#" class="aa-properties-item-img">
    <img src="img/item/1.jpg" alt="img">
  </a>
  <div class="aa-tag for-sale">
    Độ hot
  </div>
  <div class="aa-properties-item-content">
    <div class="aa-properties-info">
      Cần gì thì điền vào
    </div>
    <div class="aa-properties-about">
      <h3><a href="#">Tên phòng trọ</a></h3>
      <p>Nội dung mô tả</p>
    </div>
    <div class="aa-properties-detial">
      <span class="aa-price">
        Giá tiền
      </span>
      <a href="#" class="aa-secondary-btn">Xem chi tiết</a>`+dataType+`
    </div>
  </div>
</article>
</div>`;

console.log(htmlBlock);