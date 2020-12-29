<?php

    
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
			// GET /GetUser
			else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == strtolower("GetUser")) 
			{
				$controllerName = "user";
				$actionName = "doGetUser";
			}
			// POST /GetUserbyID
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
				count($commandArray) == 1 &&
				strtolower($commandArray[0]) == strtolower("GetUserbyID")) 
			{
				$controllerName = "user";
				$actionName = "doGetUserbyID";
			}
		// post /register
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
			count($commandArray) == 1 &&
			strtolower($commandArray[0]) == strtolower("register")) 
		{
			$controllerName = "user";
			$actionName = "registerRender";
		}
		// POST/searchUser
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
			count($commandArray) == 1 &&
			strtolower($commandArray[0]) == strtolower("searchUser")) 
		{
			$controllerName = "user";
			$actionName = "dosearchUser";
		}
		//POST/deleteUser
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
			count($commandArray) == 1 &&
			strtolower($commandArray[0]) == strtolower("deleteUser")) 
		{
			$controllerName = "user";
			$actionName = "doDeleteUser";
		}
		//POST/updateUser
			else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
			count($commandArray) == 1 &&
			strtolower($commandArray[0]) == strtolower("updateUser")) 
		{
			$controllerName = "user";
			$actionName = "doUpdateUser";
		}

		//POST/changePass
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("changePass")) 
		{
			$controllerName = "user";
			$actionName = "doChangePass";
		}
		//GET/allRoom
		else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("allRoom")) 
		{
			$controllerName = "room";
			$actionName = "doGetAllRoom";
		}
		//GET/getTinh
		else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("getTinh")) 
		{
			$controllerName = "tinhhuyenxa";
			$actionName = "doGetTinh";
		}
		//GET/getXa
		else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("getXa")) 
		{
			$controllerName = "tinhhuyenxa";
			$actionName = "doGetXa";
		}
		//GET/getHuyen
		else if ($_SERVER["REQUEST_METHOD"] == "GET" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("getHuyen")) 
		{
			$controllerName = "tinhhuyenxa";
			$actionName = "doGetHuyen";
		}
		//GET/searchRoom 
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("searchRoom")) 
		{
			$controllerName = "room";
			$actionName = "dofindRoom";
		}
		// POST/doComment
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("doComment")) 
		{
			$controllerName = "comment";
			$actionName = "doComment";
		}
		// POST/addComment
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("addComment")) 
		{
			$controllerName = "comment";
			$actionName = "addComment";
		}

		// DELETE/deleteRoomById
		else if ($_SERVER["REQUEST_METHOD"] == "DELETE" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("deleteRoomById")) 
		{
			$controllerName = "room";
			$actionName = "deleteRoomById";
		}
		// DELETE/addroom
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("addroom")) 
		{
			$controllerName = "room";
			$actionName = "doAddRoom";
		}
		// POST/file
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("file")) 
		{
			$controllerName = "image";
			$actionName = "domovefile";
		}
		else if ($_SERVER["REQUEST_METHOD"] == "POST" &&
		count($commandArray) == 1 &&
		strtolower($commandArray[0]) == strtolower("addComment")) 
		{
			$controllerName = "comment";
			$actionName = "addComment";
		}

			// Trả kết quả về cho bộ điều khiển mặt trước
			$ret["controllerName"]  = $controllerName;
			$ret["actionName"]  = $actionName;
			$ret["parameters"]  = $parameters;	
			// echo $ret;
			return $ret;
        }
    }
