let dn = document.getElementById("dn");
let htdn = document.getElementsByClassName("htdn")[0];
let htdn1 = document.getElementsByClassName("htdn1")[0];
let thoat = document.getElementById("thoat");
let nutdn = document.getElementById("nutdn");
let ip1 = document.getElementById("ip1");
let ip2 = document.getElementById("ip2");
let qltk = document.getElementById("qltk");
let qlbd = document.getElementById("qlbd");
let tb = document.getElementById("tb");
let tkpt = document.getElementById("tkpt");
let htContent1 = document.getElementById("htContent1");
let htContent2 = document.getElementById("htContent2");
let htContent3 = document.getElementById("htContent3");
let htContent4 = document.getElementById("htContent4");
let thoatndct = document.getElementsByClassName("thoat1");
console.log(htdn);
window.onload = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
dn.onclick = function () {
    htdn.style.display = "block";
    htdn1.style.display = "block";
    ip1.value = "";
    ip2.value = "";
}
thoat.onclick = function () {
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
nutdn.onclick = function () {
    alert("Đăng nhập thành công " + "\n" + "Tài khoản: " + ip1.value);
    htdn.style.display = "none";
    htdn1.style.display = "none";
}
qltk.onclick = function () {
    htContent1.style.display = "block";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
}
qlbd.onclick = function () {
    htContent2.style.display = "block";
    htContent1.style.display = "none";
    htContent3.style.display = "none";
    htContent4.style.display = "none";
}
tb.onclick = function () {
    htContent3.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent4.style.display = "none";
}
tkpt.onclick = function () {
    htContent4.style.display = "block";
    htContent1.style.display = "none";
    htContent2.style.display = "none";
    htContent3.style.display = "none";
}
for (let i = 0; i <= 3; i++) {
    thoatndct[i].onclick = function () {
        htContent1.style.display = "none";
        htContent2.style.display = "none";
        htContent3.style.display = "none";
        htContent4.style.display = "none";
    }
}