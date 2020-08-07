<?php

include '../db_linker.php';
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');

        $link = linkToLC();

        date_default_timezone_set("Asia/Kolkata");

        $t = time();

        $curr_timestamp = (date("Y-m-d H:i:s", $t));

    while (1) {
// 1 is always true, so repeat the while loop forever (aka event-loop)

        $sql = "SELECT u.`name`,u.`email`, gc.`message`, gc.`timestamp` FROM `group_chat` gc
                LEFT JOIN `groups` g ON g.id=gc.group_id
                LEFT JOIN `users` u ON u.id=gc.from_id
                WHERE DATE_FORMAT(gc.`timestamp`,'%Y-%m-%d %H:%i:%s')>DATE_FORMAT('$curr_timestamp','%Y-%m-%d %H:%i:%s')
                ";

        $handle = $link->prepare($sql);
        $handle->execute();
        if ($handle->rowCount()) {
            $result = json_encode($handle->fetchAll(PDO::FETCH_ASSOC));
            $t = time();
            $curr_timestamp = (date("Y-m-d H:i:s", $t));

            echo "event: community\n",
                'data: ' . $result, "\n\n";


            while (ob_get_level() > 0) {
                ob_end_flush();
            }
            flush();
        }
//         Send a simple message at random intervals.

//         flush the output buffer and send echoed messages to the browser

//         break the loop if the client aborted the connection (closed the page)

        if ( connection_aborted() ) {
//            session_start();
//            $id = $_SESSION['id'];
            $sql="INSERT INTO `activity`(`user_id`,`status`) VALUES(:user_id,0)";
            $handle=$link->prepare($sql);
            $handle->execute(array(
                'user_id'=>5,
            ));
            break;
        }

//         sleep for 1 second before running the loop again

        sleep(1);
//
    }

//    header('Content-Type: text/event-stream');
//    header('Cache-Control: no-cache');
//    echo "event: logged_in\n",
//        'data: {"status":"false"}', "\n\n";
//    while (ob_get_level() > 0) {
//        ob_end_flush();
//    }
