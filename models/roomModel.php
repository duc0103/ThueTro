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

       $data1 =  $this->db->doQuery("select r.*,u.name from room_for_rent r INNER JOIN user u ON r.owners_Id=u.user_id where public = 1
       ;");
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
    public function updateRoom($room_id,$ten,$dateEnd,$public){
        return $this->db->doQuery("UPDATE  
        room_for_rent SET tenphong ='$ten',ngay_het_han = '$dateEnd',public = '$public'
        WHERE room_id='$room_id';");

    }
    public function findRoom($road,$loai_phong,$tinh,$huyen,$xa,$priceMin,$priceMax,$sMin,$smax){
        $data1 =  $this->db->doQuery("select * from room_for_rent 
        where public = 1 and
        address like '%$road%' and
        loai_phong like '%$loai_phong%' and
        diachi_tinh = '$tinh' and
        diachi_huyen ='$huyen' and
        diachi_xa = '$xa' and 
        gia_thue >= $priceMin and
        gia_thue <= $priceMax and
        room_area >= $sMin and
        room_area <= $smax
        ;");
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
    public function addRoom($nane,$bancong,$nlanh,$phongtam,$chung,$gphong,$gdien,$type,$gnuoc,$bep,$time,$mo,$a1,$a2,$a3,$r,$s,$tinh,$huyen,$xa,$user_id)
    {
        
    }
}