<?php
    namespace core\model;
    use \PDO;
    
	class PDOData {
		private $db = null; 
		public function __construct() {
			try {
				$this->db = new PDO("mysql:host=localhost;dbname=accommodations;", "root", "");
			} catch(PDOException $ex) { echo $ex->getMessage();	}
		}

		/**
		* Ham huy
		*/
		public function __destruct() {
		    /** Dong ket noi */
			try {
				$this->db = null;
			} catch(PDOException $ex) { echo $ex->getMessage();	}
		}

        /**
		* Thuc hien truy van
		* $query: Cau lenh select
		* return: mang cac ban ghi, so trang
		*/
		public function doQuery($query) {
			$ret = array(); 
			
			try {
				$stmt = $this->db->query($query);  
				if ($stmt) {
					while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
						$ret[] = $row; 
					}
				} 
			} catch(PDOException $ex) {	echo $query; }
			
			return $ret;
		}
		
		/**
		* Thực hiện truy vấn theo câu lệnh chuẩn bị trước
		* $queryTmpl: Mẫu câu truy vấn
		* $paras: Mảng các tham số cho truy vấn
		* return: Mảng các bản ghi
		*/
		public function doPreparedQuery($queryTmpl, $paras) {
			$ret = array();
			try {
				$stmt = $this->db->prepare($queryTmpl);
				foreach ($paras as $k=>$v) $stmt->bindValue($k+1, $v);
				$stmt->execute();
				while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
					$ret[] = $row; 
				}
			} catch(PDOException $ex) {	echo $ex; }
			
			return $ret;
		}	

		/**
		* Thực hiện cập nhật 
		* $sql: Câu lệnh insert, update, delete
		* return: Số bản ghi được cập nhật
		*/
		public function doSql($sql) {
		    $count = 0;
			try {
				$count = $this->db->exec($sql);
			} catch(PDOException $ex) {
				$count = -1;
			}
			return $count;
		}

		/**
		* Thực hiện cập nhật theo câu lệnh chuẩn bị trước
		* $sql: Câu lệnh insert, update, delete
		* return: Số bản ghi được cập nhật
		*/
		public function doPreparedSql($queryTmpl, $paras) { 
			$count = 0;
			try {
				$stmt = $this->db->prepare($queryTmpl);
				foreach ($paras as $k=>$v) $stmt->bindValue($k+1, $v);
				$stmt->execute();
				$count = $stmt->rowCount();
			} catch(PDOException $ex) {	return -1; }
			return $count;
		}	
		
		 
	}
