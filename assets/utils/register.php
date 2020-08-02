<?php
include 'db_linker.php';

function get_last_id(){
    $link = linkToLC();
    $sql="SELECT `id` FROM `users` ORDER BY `id` DESC LIMIT 1";
    $handle=$link->prepare($sql);
    $handle->execute();
    $result = $handle->fetchAll(PDO::FETCH_ASSOC);
    return $result[0]['id'];
}
function check_if_user_exist($email){
    $link = linkToLC();

    $sql="SELECT `email` FROM `users` WHERE `email`=:email";
    $handle=$link->prepare($sql);
    $handle->execute(array('email'=>$email));
    $result = $handle->fetchAll(PDO::FETCH_COLUMN);
    if(count($result)) return true;
    return false;
}
function register(){
    try {
        session_start();
        if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['pass'])){
            $link = linkToLC();
            $email=$_POST['email'];
            if(check_if_user_exist($email)){
                return 'user_exist';
            }
            $name=$_POST['name'];
            $pass=$_POST['pass'];
            $sql="INSERT INTO `users`(`name`, `email`, `password`) VALUES (:name,:email,:pass)";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'name'=>$name,
                'email'=>$email,
                'pass'=>$pass
            ));
            $_SESSION['name']=$name;
            $_SESSION['email']=$email;
            $_SESSION['id']=get_last_id();
            $_SESSION['logged_in']=true;
            return 'S';
        }
        else{
            return 'F';
        }
    }
    catch(Exception $e){
        return "F";
    }
}
echo register();
?>