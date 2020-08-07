<?php
include '../db_linker.php';

function updateStatus(){
    try {
        session_start();
        if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] && isset($_SESSION['id']) && isset($_POST['status'])){
            $link = linkToLC();
            $status = $_POST['status'];
            $id = $_SESSION['id'];
            if($status=='online')   $sql="INSERT INTO `activity`(`user_id`) VALUES(:user_id)";
            else                    $sql="INSERT INTO `activity`(`user_id`,`status`) VALUES(:user_id,0)";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'user_id'=>$id,
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
echo updateStatus();
?>