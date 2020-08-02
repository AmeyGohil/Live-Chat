<?php

include 'db_linker.php';

function login(){
    try {
        session_start();
        if(isset($_POST['email']) && isset($_POST['pass'])){
            $email=$_POST['email'];
            $password=$_POST['pass'];
            $link = linkToLC();
            $sql="SELECT `id`,`name` FROM `users` WHERE `email`=:email";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'email'=>$email,
            ));
            if(!$handle->rowCount()) return 'email_not_found';
            $sql="SELECT `id`,`name` FROM `users` WHERE `email`=:email AND `password`=:password";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'email'=>$email,
                'password'=>$password,
            ));
            if(!$handle->rowCount()) return 'pass_wrong';
            $result = $handle->fetchAll(PDO::FETCH_ASSOC);
            $result = $result[0];
            $_SESSION['name']=$result[0]['name'];
            $_SESSION['email']=$email;
            $_SESSION['id']=$result['id'];
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
echo login();
?>