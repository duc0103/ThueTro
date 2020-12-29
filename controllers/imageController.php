
<?php
if (isset($_FILES["upfile"])) {
    $a='./$_FILES["upfile"]["name"]';
    if ($_FILES["upfile"]['error'] > 0);
        
    else {
        $image=$_FILES["upfile"]['name'];
        if(!file_exists( $a)){
            move_uploaded_file($_FILES["upfile"]['tmp_name'], '../Client/main/img/' . $_FILES["upfile"]['name']);
        };
    }
}
if (isset($_FILES["upfile2"])) {
    $a='./$_FILES["upfile2"]["name"]';
    if ($_FILES["upfile2"]['error'] > 0);
        
    else {
        $image=$_FILES["upfile2"]['name'];
        if(!file_exists( $a)){
            move_uploaded_file($_FILES["upfile2"]['tmp_name'], '../Client/main/img/' . $_FILES["upfile2"]['name']);
        };
    }
}
if (isset($_FILES["upfile3"])) {
    $a='./$_FILES["upfile3"]["name"]';
    if ($_FILES["upfile3"]['error'] > 0);
        
    else {
        $image=$_FILES["upfile3"]['name'];
        if(!file_exists( $a)){
            move_uploaded_file($_FILES["upfile3"]['tmp_name'], '../Client/main/img/' . $_FILES["upfile3"]['name']);
        };
    }
}

