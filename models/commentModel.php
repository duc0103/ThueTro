<?php

require_once("models/PDOData.php");

class comment {
	private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;} 
    public function getComment($room_id){
        return $this->db->doQuery("SELECT * FROM comments WHERE id_room = '$room_id' ORDER by Date DESC");
    }
    public function addComment($id_user,$room_id,$content,$date){
        return $this->db->doQuery("
        INSERT INTO `comments` (`id_user`, `id_room`, `content`, `Date`) 
        VALUES ('$id_user', '$room_id', '$content', '$date');
        ");
    }
}