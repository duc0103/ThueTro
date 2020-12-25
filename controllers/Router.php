<?php
	// Tệp app/core/control/Router.php
    namespace core\control;
    
    class Router {
		/*
			Input: RESTful URL
			Output: ["module", "controller", "action", [parameters]]
		*/
        public static function proc() {
			$ret = array();
            $controllerName = "fallback";	// Tên bộ điều khiển, mặc định là trình điều khiển báo lỗi
            $actionName = "proc";			// Tên hành động
            $parameters = array();			// Các tham số

			// Tách URI
			$requestURI = explode('/', strtolower($_SERVER['REQUEST_URI']));
			$scriptName = explode('/', strtolower($_SERVER['SCRIPT_NAME']));
			$commandArray = array_diff_assoc($requestURI, $scriptName);
			$commandArray = array_values($commandArray);
			// GET /logged
		 if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logged") 
			{
				$controllerName = "user";
				$actionName = "hasLogged";
			}
			// POST /login 
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "login") 
			{
				$controllerName = "user";
				$actionName = "doLogin";
			}

			// GET /logout
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logout") 
			{
				$controllerName = "user";
				$actionName = "doLogout";
			}
			// Trả kết quả về cho bộ điều khiển mặt trước
			$ret["controllerName"]  = $controllerName;
			$ret["actionName"]  = $actionName;
			$ret["parameters"]  = $parameters;	
			return $ret;
        }
    }
