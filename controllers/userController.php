<?php

require_once("models/userModel.php");
require_once("Core/model/Util.php");

class UserController {
	public function __contruct() {}
	public function __destruct() {}
	//
	//
	// Kiểm tra trạng thái người dùng đã đăng nhập hay chưa
	// return 	[1, uname, fullname] nếu người dùng đã đăng nhập
	//			[0, "", ""] nếu ngược lại
	public function hasLogged() {
		$ret = 0;
    	if (isset($_SESSION["user"])) $ret = 1;
		return array("status" => "OK", "data" => [$ret, $_SESSION["user"], $_SESSION["name"],$_SESSION["per"],$_SESSION["id"]]);
	}
	//
	//
	// Đăng nhập (xác thực username/password)
	// return 	1 nếu hợp lệ
	//			0 nếu ngược lại
	public $a;
	 public function doLogin() { 
		$id="";
		$ret = 0; 
    	if (isset($_SESSION["user"])) $ret = 1;
		else {
			$input = json_decode(file_get_contents("php://input"), true);
			if (isset($input["user"]) && 
				isset($input["pass"]) && 
				isset($input["loginSubmitted"]) && 
				$input["loginSubmitted"] == "1")
			{
				$user = new User();
				$auth = $user->checkAccount($input["user"], $input["pass"]);
				$this->a=$auth;
				if ($auth[0]) {
					// Thiết lập dữ liệu phiên
					$_SESSION["user"] =$auth[1]["user"];
					// $_SESSION["user"]=$auth[1]["user_id"];
					$_SESSION["name"] = $auth[1]["name"];
					$_SESSION["per"]=$auth[1]["per"];
					$_SESSION["status"]=$auth[1]["status"];
					$_SESSION["id"]=$auth[1]["user_id"];
					$ret = 1;
				}
			}
		}
		return array("status" => "OK", "data" => $ret );
   }
	//
	//
	// Đăng xuất
   public function doLogout() {
		unset($_SESSION["user"]);
		unset($_SESSION["name"]);
		unset($_SESSION["per"]);
		unset($_SESSION["status"]);
		unset(	$_SESSION["id"]);
		return array("status" => "OK", "data" => 1);
   }
   public function registerRender(){
		$ret = 0; 
		$input = json_decode(file_get_contents("php://input"), true);
		if (isset($input["user"]) && 
			isset($input["pass"]) && 
			Util::emailValid($input["email"]) && 
			isset($input["name"] ))
		{
			$user = new User();
			$checkuseremail=$user->checkEmailUserExist($input["email"],$input["user"]);
			if(!$checkuseremail){
				$authAdd = $user->addUserRender($input["user"], $input["pass"],$input["email"],$input["name"]);
				if ($authAdd) {
					$ret = 1;
				}
			}
		
		}
	return array("status" => "OK", "data" => $ret);
   }
   public function doGetUser(){
	   //quyen admin ms xem đc các user
	   if(isset($_SESSION["user"]) && $_SESSION["status"]== 1 ){
			$user = new User();
			$data=$user->getAllUser();
			return array("status"=> "ok" ,"data"=> $data);
	   }
	   return array("status"=> "nok" ,"data"=> "ko co");
   }
   public function doGetUserbyID(){
	$input = json_decode(file_get_contents("php://input"), true);
		 $user = new User();
		 $data=$user->getUserByUserID($input["user_id"]);
		 if(count($data)>0){
			return array("status"=> "ok" ,"name"=> $data["name"],"phone"=>$data["phoneNumber"],"email"=>$data["email"]);
		 
	}
	return array("status"=> "nok" ,"data"=> "ko co");

}
   public function dosearchUser(){
		$input = json_decode(file_get_contents("php://input"), true);
		if(isset($_SESSION["user"]) && $_SESSION["status"]== 1 && isset($input["search"]) ){
			$user = new User();
			$data=$user->searchUser($input["search"]);
			return array("status"=> "ok" ,"data"=> $data);
   }
   return array("status"=> "nok" ,"data"=> $input);
   }
   public function doDeleteUser(){
	$input = json_decode(file_get_contents("php://input"), true);
	if(isset($_SESSION["user"]) && $_SESSION["status"]== 1 && isset($input["id"]) ){
		$user = new User();
		$data=$user->deleteUser($input["id"]);
		return array("status"=> "ok" ,"data"=> $data);

   }
}
   public function doUpdateUser(){
	$input = json_decode(file_get_contents("php://input"), true);
	
	
	if(isset($_SESSION["user"]) && $_SESSION["status"]== 1  ){
		$user = new User();
		$checkuseremail=$user->checkEmailPassExisUpdate($input["email"],$input["user"]);
		if(!$checkuseremail){
			$data=$user->updateUser($input["id"],$input["code_id"],$input["user"],$input["address"],$input["email"],$input["phone"],$input["name"],$input["per"]);
			return array("status"=> "ok" ,"data"=> 	$data);
		}
	
   }
   return array("status"=> "nok" ,"data"=> "loi");
}
	public function doChangePass(){
		$input = json_decode(file_get_contents("php://input"), true);
		$user = new User();
		$data=$user->changePass($input["pass"],$input["newpass"]);
		return array("status"=> "ok" ,"data"=> $data);

	}
   
}
