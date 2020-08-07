<?php
include '../db_linker.php';

function send(){
    try {
        session_start();
        if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] && isset($_SESSION['id']) && isset($_POST['target']) && isset($_POST['text']) && isset($_POST['timestamp'])) {
            $link = linkToLC();
            $email = $_SESSION['email'];
            $target = $_POST['target'];
            $text = $_POST['text'];
            $timestamp = $_POST['timestamp'];
            $id = $_SESSION['id'];
            $sql="INSERT INTO `group_chat`(`from_id`, `message`, `timestamp`, `group_id`) VALUES (:from_id,:message,NOW(),:group_id)";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'from_id'=>$id,
                'message'=>$text,
                'group_id'=>$target
            ));
            return 'S';
        }
        else{
            return 'F';
        }
    }
    catch(Exception $e){
        return $e;
    }
}
echo send();
?>