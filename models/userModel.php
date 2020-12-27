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
        // kiểm tra xem email dăng kí đăng nhập có tồn tại
    public function checkEmailUserExist($e,$u){
        $data= $this->db->doQuery(" select user from User where email = '$e' or user = '$u'");
        if (count($data) > 0) return true;
        // // không thành công
        return false;
    }
    public function getAllUser(){
        $data = $this->db->doQuery ("select * from User where status=0 or status = 2");
        return $data;
    }
   
    public function addUserRender($user,$pass,$email,$name){
        $data=$this->db->doQuery("
        INSERT INTO user (user, pass, email, name,per)
        VALUES ('$user','$pass','$email','$name','render');");
        return true;
    }
    public function searchUser($a){
        return $this->db->doQuery("select * from User where user like '%$a%' or email like '%$a%' or code_id like '%$a%' or per ='$a' or name like '%$a%'
        " );
    }
    public function deleteUser($id){
         $this->db->doQuery("delete  from User where user_id='$id';");
        return  $this->db->doQuery ("select * from User where status=0 or status = 2");

    }
    public function updateUser($id,$user,$pass,$email,$name){
        $this->db->doQuery("
        update User set pass = '$pass' , email =' $email', name = '$name' ,user = '$user' where user_id  = '$id';
        ");
        return  $this->db->doQuery ("select * from User where status=0 or status = 2");
    }
}   
