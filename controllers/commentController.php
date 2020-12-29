<?php
require_once("models/commentModel.php");
require_once("Core/model/Util.php");

class commentController
{
    public function __contruct() {}
    public function __destruct() {}
    public function doComment(){
        $input = json_decode(file_get_contents("php://input"), true);
        $comment = new comment();
            $data=$comment->getComment($input["room_id"]);
            return array("status"=> "ok" ,"data"=> $data);
    }
    public function addComment(){
        $input = json_decode(file_get_contents("php://input"), true);
        $comment = new comment();
        $check=$comment->addComment($input["user_id"],$input["room_id"],$input["content"]);
        if($check==1){
            $data=$comment->getComment($input["room_id"]);
            return array("status"=> "ok" ,"data"=> $data);
        }
        return array("status"=> "nok" ,"data"=> "");      
    }
}
