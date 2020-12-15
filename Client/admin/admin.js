let dn = document.getElementById("dn");
let htdn = document.getElementsByClassName("htdn")[0];
let htdn1 = document.getElementsByClassName("htdn1")[0];
let thoat = document.getElementById("thoat");
let nutdn = document.getElementById("nutdn");
let ip1 = document.getElementById("ip1");
let ip2 = document.getElementById("ip2");
console.log(htdn);
window.onload = function()
{
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
dn.onclick = function(){
    htdn.style.display = "block";
    htdn1.style.display = "block";
    ip1.value = "";
    ip2.value = "";
}
thoat.onclick = function()
{
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
nutdn.onclick = function()
{
    alert("Đăng nhập thành công " + "\n" + "Tài khoản: " + ip1.value);
    htdn.style.display = "none";
    htdn1.style.display = "none";
}