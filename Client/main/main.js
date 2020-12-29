// người dùng đã đăng nhập
document.getElementById("logout").style.display="none";
document.getElementById("changePass").style.display="none"; 
fetch("../../index.php/logged")
.then(resp2 => {
    if (resp2.status == 200) {
        resp2.json()
            .then(ret2 => {
                if (ret2.status == "OK") {
                  document.getElementById("nameUser").textContent="Tài Khoản: "+ret2.data[1];
                  
                  document.getElementById("btnRes").style.display="none";
                  document.getElementById("btnlogin").style.display="none";
                  document.getElementById("logout").style.display="inline-block";
                  document.getElementById("changePass").style.display="inline-block"; 
                    if (ret2.data[0] == 1 && ret2.data[3]=="admin") {
                        // alert("bạn đã đăng nhập thành công");
                        if(confirm("Bạn Là Amin bạn có muốn vào trang quản lí")){
                          document.location.href = "../admin/admin.htm";
                      }                      
                    }   
                }   
            });
    }
});
document.getElementById("loginaddRoom").onclick =function(){
  fetch("../../index.php/logged")
  .then(resp2 => {
      if (resp2.status == 200) {
          resp2.json()
              .then(ret2 => {
                  if (ret2.status == "OK") {
                    document.getElementById("nameUser").textContent="Tài Khoản: "+ret2.data[1];           
                    document.getElementById("btnRes").style.display="none";
                    document.getElementById("btnlogin").style.display="none";
                    document.getElementById("logout").style.display="inline-block";
                    document.getElementById("changePass").style.display="inline-block"; 
                      if (ret2.data[0] == 1 && (ret2.data[3]=="admin"||ret2.data[3]=="owner")) {
                            document.location.href = "../main/themphongtro.htm";     
                      }   
                      else{
                          alert("này này dừng có thêm khi không là chủ nhà trọ chứ");
                      }
                      
                  }   
              });
      }
  });
}
