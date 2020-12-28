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
    public function getAllroom() {
       $data =  $this->db->doQuery("select * from room_for_rent ;");
       return $data;
    }
    public function getRoomById($id) {
        return $this->db->doQuery("select * from room_for_rent where room_id = '$id';");
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
        return $this->db->doQuery("delete from room_for_rent where room_id = '$id';");
    }
    // public function update($m, $ht, $ns, $qq) {
    //     return $this->db->doPreparedSql("update sinhvien set hoten = ?, ngaysinh = ?, quequan = ? where masv = ?;", array($ht, $ns, $qq, $m));
    // }
}