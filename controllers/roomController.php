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
    public function doGetAllRoomAdmin(){
        $room = new Room();
            $data=$room->getAllroomByAdmin();
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
    public function deleteRoomById(){
        $input = json_decode(file_get_contents("php://input"), true);
        $room = new Room();
        $data1 = $room->deleteRoom( $input["room_id"]);
        $data= $room->getAllroom();
        return array("status"=> "ok" ,"data"=> $data);
    }
    public function doAddRoom(){
        $input = json_decode(file_get_contents("php://input"), true);
        $room = new Room();
        $data1 = $room->addRoom( $input["name"],$input["bancong"],$input["nlanh"],$input["phongtam"],$input["chung"],$input["gphong"],$input["gdien"],$input["type"],$input["gnuoc"],$input["bep"],$input["s"],$input["time"],$input["mo"],$input["tinh"],$input["huyen"],$input["xa"],$input["user_id"],$input["gan"],$input["duong"]);
         $room->addUrlImage($data1,$input["anh1"]);
         $room->addUrlImage($data1,$input["anh2"]);
         $room->addUrlImage($data1,$input["anh3"]);

        return array("status"=> "ok" );

    }
    public function doUpdateRoom(){
        $input = json_decode(file_get_contents("php://input"), true);
        $room = new Room();
        $data1 = $room->updateRoom( $input["room_id"],$input["tenphong"],$input["date_end"],$input["public"]);
        $data= $room->getAllroom();
        return array("status"=> "ok" ,"data"=> $data);
    }
   
}