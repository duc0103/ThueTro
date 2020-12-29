<?php

require_once("models/PDOData.php");
class imageModel{
    private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;}
    public function getTinh(){
        return $this->db->doQuery("select * from devvn_tinhthanhpho");
    }
    public function getHuyen(){
        return $this->db->doQuery("select * from devvn_quanhuyen");
    }
    public function getXa(){
        return $this->db->doQuery("select * from devvn_xaphuongthitran");
    }

}