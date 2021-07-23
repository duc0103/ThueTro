<?php

require_once("models/tinhhuyenxaModel.php");
require_once("Core/model/Util.php");

class tinhhuyenxaController {
	public function __contruct() {}
    public function __destruct() {}
    public function doGetTinh(){
        $tinhhuyenxa = new tinhhuyenxa();
            $data=$tinhhuyenxa->getTinh();
            return array("status"=> "ok" ,"data"=> $data);

    }
    public function doGetHuyen(){
        $tinhhuyenxa = new tinhhuyenxa();
        $data=$tinhhuyenxa->getHuyen();
        return array("status"=> "ok" ,"data"=> $data);
    }
    public function dogetXa(){
        $tinhhuyenxa = new tinhhuyenxa();
        $data=$tinhhuyenxa->getXa();
        return array("status"=> "ok" ,"data"=> $data);
    }
}