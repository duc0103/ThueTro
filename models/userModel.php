<?php

require_once("models/PDOData.php");

class User {
	private $db;
    public function __construct() { $this->db = new PDOData();}
    public function __destruct() { $this->db = null;}
    //
	//
	// Xác thực username/password
	// return true/false + họ tên người dùng đăng nhập thành công 
    public function checkAccount($u, $p) {
        $data = $this->db->doQuery("select * from User where user = '$u' and pass = '$p';");
     	// Thành công
        if (count($data) > 0) return [true, $data[0]];
        // // không thành công
        return [false, ""];
    }
	//
	//
	// Kiểm tra quyền truy cập
	// Input: user, resource
	// return Danh sách quyền 
    public function accessRights($user, $resource) {
        $data = $this->db->doPreparedQuery("select quyen from quyensd where tsd like ? and tainguyen like ?;", array($user, $resource));
		$ret = array();
		foreach ($data as $item)
			array_push($ret, $item["quyen"]);
        return $ret;
    }
    public function getAll(){
        $data = $this->db->doQuery ("select * from User ");
        return $data;

    }
    // public function addUserRender($user,$pass,$email,$name){
    //     $data=$this->db->doQuery("INSERT INTO user (user, pass, email, name)
    //     VALUES ('Trinh Giao Kim',"Nam","44","Bac Lieu");")
    // }
}   
