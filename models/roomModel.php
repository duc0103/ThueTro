<?php

require_once("models/PDOData.php");

class Room {
	private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;}
    public function deleteRoom($room_id){
        return $this->db->doQuery("delete from room_for_rent where room_id = '$m';");
    }
    public function getUrlImage($id){
        $data = $this->db->doQuery("select * from image where room_id = '$id' ;");
        if (count($data) > 0) return [true, $data[0]];
        // // không thành công
        return [false, ""];

    }
    //dưa ra tất cả các phòng
    public function getAllroom() {

       $data1 =  $this->db->doQuery("select * from room_for_rent ;");
       $data2 =  $this->db->doQuery("select * from image ;");

       for($i=0;$i<count($data1);$i++){
        $data1[$i]["image"]=array();
        for($j=0;$j<count($data2);$j++){
            if($data1[$i]["room_id"]== $data2[$j]["room_id"]){
                    $data1[$i]["image"][]=$data2[$j]["url_image"];
            }
        }
       }
       return $data1; 
    }
    //đưa ra 10 phòng được thêm mới nhất
    public function getTenroom() {
        $data =  $this->db->doQuery(" SELECT * FROM `room_for_rent` ORDER BY `room_for_rent`.`ngay_dang` DESC limit 10
        ;");
        $data["urlimage"]= "";
        return $data;
     }
    //tìm phòng theo id
    public function getRoomById($id) {
        $data = $this->db->doQuery("select * from room_for_rent where room_id = '$id' ;");
        if (count($data) > 0) return [true, $data[0]];
        // // không thành công
        return [false, ""];
    }
    // public function addRoom($m, $ht, $ns, $qq) {
    //     return $this->db->doPreparedSql("insert into sinhvien(masv, hoten, ngaysinh, quequan) values(?, ?, ?, ?);", array($m, $ht, $ns, $qq));
    // }
    public function addUrlImage($id,$urlImage){
        return $this->db->doQuery("insert into 
        image(room_id,url_image) 
        values($id, '$urlImage' );");
    }
    //xoa phong bang id
    public function deleteRom($id) {
        $data = $this->db->doQuery("select * from   ");
         $this->db->doQuery("delete from room_for_rent where room_id = '$id';");
        return  $this->db->doQuery ("select * from room_for_rent where status=0 or status = 2");

    }
    // public function update($m, $ht, $ns, $qq) {
    //     return $this->db->doPreparedSql("update sinhvien set hoten = ?, ngaysinh = ?, quequan = ? where masv = ?;", array($ht, $ns, $qq, $m));
    // }
}