<?php

require_once("models/PDOData.php");

class comment {
	private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;} 
    public function getComment($room_id){
        $data= $this->db->doQuery("
        SELECT u.user_id , c.Date,u.name , c.id_room,c.content FROM user u INNER JOIN comments c on u.user_id=c.id_user WHERE c.id_room = '$room_id' ORDER BY c.Date DESC
        ");
        return  $data;

    }
    public function addComment($id_user,$room_id,$content){
        $date=getdate();
      return $this->db->doSql("
        INSERT INTO `comments` (`id_user`, `id_room`, `content`, `Date`) 
        VALUES ('$id_user', '$room_id', '$content', now());
        ");
        
    }
}