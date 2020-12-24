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
			$moduleName = "fallback";		// Tên module, mặc định là module báo lỗi
            $controllerName = "fallback";	// Tên bộ điều khiển, mặc định là trình điều khiển báo lỗi
            $actionName = "proc";			// Tên hành động
            $parameters = array();			// Các tham số

			// Tách URI
			$requestURI = explode('/', strtolower($_SERVER['REQUEST_URI']));
			$scriptName = explode('/', strtolower($_SERVER['SCRIPT_NAME']));
			$commandArray = array_diff_assoc($requestURI, $scriptName);
			$commandArray = array_values($commandArray);
			
			// GET /students
			if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1	&&
				strtolower($commandArray[0]) == "students")
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "proc";
			}
			// GET /std 
						// Alias cho students
						// Có thể ánh xạ nhiều URI đến một controller.action
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 
					count($commandArray) == 1	&&
					strtolower($commandArray[0]) == "std") 
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "proc";
			}
			// GET /students/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "GET" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "students") 
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "getById";
				$parameters[0] = $commandArray[1];
			}
			// POST /students/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 2 &&	
				strtolower($commandArray[0]) == "students") 
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "addStd";
				$parameters[0] = $commandArray[1];
			}
			// DELETE /students/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "DELETE" && 	
					count($commandArray) == 2 &&
					strtolower($commandArray[0]) == "students") 
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "delStd";
				$parameters[0] = $commandArray[1];
			}
			// PUT /students/{id}
			else if ($_SERVER["REQUEST_METHOD"] == "PUT" &&
				count($commandArray) == 2 &&
				strtolower($commandArray[0]) == "students") 
			{
				$moduleName = "qldt";
				$controllerName = "std";
				$actionName = "updateStd";
				$parameters[0] = $commandArray[1];
			}

			// GET /logged
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logged") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "hasLogged";
			}

			// POST /login 
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "login") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "doLogin";
			}

			// GET /logout
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == "logout") 
			{
				$moduleName = "account";
				$controllerName = "user";
				$actionName = "doLogout";
			}

			

			// Trả kết quả về cho bộ điều khiển mặt trước
			$ret["moduleName"]  = $moduleName;		
			$ret["controllerName"]  = $controllerName;
			$ret["actionName"]  = $actionName;
			$ret["parameters"]  = $parameters;	
			return $ret;
        }
    }
