<?php
namespace controllers;
require_once("models/userModel.php");

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
		return array("status" => "OK", "data" => [$ret, $_SESSION["user"], $_SESSION["name"],$_SESSION["per"]]);
	}
	//
	//
	// Đăng nhập (xác thực username/password)
	// return 	1 nếu hợp lệ
	//			0 nếu ngược lại
	 public function doLogin() { 
		$ret = 0; 
    	if (isset($_SESSION["user"])) $ret = 1;
		else {
			$input = json_decode(file_get_contents("php://input"), true);
			if (isset($input["user"]) && 
				isset($input["pass"]) && 
				isset($input["loginSubmitted"]) && 
				$input["loginSubmitted"] == "1")
			{
				$user = new \models\User();
				$auth = $user->checkAccount($input["user"], $input["pass"]);
				if ($auth[0]) {
					// Thiết lập dữ liệu phiên
				    $_SESSION["user"] = $input["user"];
					$_SESSION["name"] = $auth[1]["name"];
					$_SESSION["per"]=$auth[1]["per"];
					$ret = 1;
				}
			}
		}
		return array("status" => "OK", "data" => $ret);
   }
	//
	//
	// Đăng xuất
   public function doLogout() {
		unset($_SESSION["user"]);
		unset($_SESSION["name"]);
		return array("status" => "OK", "data" => 1);
   }
}
