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
}