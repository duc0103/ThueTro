<?php

require_once("models/roomModel.php");
require_once("Core/model/Util.php");

class RoomController {
	public function __contruct() {}
    public function __destruct() {}
    public function doGetAllRoom(){
        $room = new Room();
            $data=$room->getAllroom();
            return array("status"=> "ok" ,"data"=> $data);
    }
    // public function addRoom(){
        
    // }
    public function dofindRoom(){
        $input = json_decode(file_get_contents("php://input"), true);
        $room = new Room();
        $data = $room->findRoom( $input["road"],$input["loai_phong"],$input["tinh"],$input["huyen"],$input["xa"],$input["priceMin"],$input["priceMax"],$input["Smin"],$input["smax"]);
        return array("status"=> "ok" ,"data"=> $data);
    }
}