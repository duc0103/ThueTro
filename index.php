<?php
	namespace core\control;
    require_once("Controllers/Router.php");

    //Bộ điều khiển mặt trước
    class FrontController {
        public static function proc() {  
			// Khởi động phiên
			session_start();
            //Định tuyến
            $ret = Router::proc();
            //Bao hàm tệp cài đặt lớp điều khiển
            $filename = "controllers/".ucfirst($ret["controllerName"])."Controller.php"; 
            require_once($filename);
            //Khai báo đối tượng lớp điều khiển
            $controllerName = "controllers\\".ucfirst($ret["controllerName"])."Controller";  
            $controller = new $controllerName();
			//Kiểm tra phương thức có tồn tại hay không và thực thi 
			//trả kết quả cho frontend
			if (method_exists($controller, $ret['actionName'])) {
                $action = $ret['actionName'];
                $ret = $controller->$action($ret['parameters']);
				header('Content-type: application/json');
    			echo json_encode($ret);
            } else {
				header('Content-type: application/json');
            	echo '{"status":"ERR", "data":"ACTION-NOT-FOUND"}';
			}
        }
    }
	
    FrontController::proc();
