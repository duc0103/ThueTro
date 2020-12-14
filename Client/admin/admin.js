let dn = document.getElementById("dn");
let htdn = document.getElementsByClassName("htdn")[0];
let htdn1 = document.getElementsByClassName("htdn1")[0];
let thoat = document.getElementById("thoat");
let nutdn = document.getElementById("nutdn");
console.log(htdn);
window.onload = function()
{
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
dn.onclick = function(){
    htdn.style.display = "block";
    htdn1.style.display = "block";
}
thoat.onclick = function()
{
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
nutdn.onclick = function()
{
    alert("Đăng nhập thành công");
    htdn.style.display = "none";
    htdn1.style.display = "none";
}