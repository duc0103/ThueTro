<?php

require_once("models/PDOData.php");

class Room {
	private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;} 
    public function getUrlImage($id){
        $data = $this->db->doQuery("select * from image where room_id = '$id' ;");
        if(count($data)>0){
            return [true,"data"=>$data];
        }
        
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
    
    //tìm phòng theo id
    public function getRoomById($id) {
        $data = $this->db->doQuery("select * from room_for_rent where room_id = '$id' ;");
        $data1= $this->db->doQuery("select * from image where room_id = '$id';");
        if (count($data) > 0) 
        {   
            for($j=0;$j<count($data1);$j++)
                {
                $data[0]["image"][]=$data1[$j]["url_image"];
                }
            return [true, $data[0]];
        }
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
    public function deleteRoom($id) {
        // $data = $this->db->doQuery("select * from   ");
         $this->db->doQuery("delete from room_for_rent where room_id = '$id';");
         $this->db->doQuery("delete from image where room_id = '$id';");
         $this->db->doQuery("delete from yeu_thich where room_id = '$id';");
         $this->db->doQuery("delete from comments where id_room = '$id';");
        return  true;

    }
    public function updateRoom(){

    }
    // public function update($m, $ht, $ns, $qq) {
    //     return $this->db->doPreparedSql("update sinhvien set hoten = ?, ngaysinh = ?, quequan = ? where masv = ?;", array($ht, $ns, $qq, $m));
    // }
}