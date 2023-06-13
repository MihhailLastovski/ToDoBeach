<?php
require_once("conf.php");
$taskId = $_POST['task_id'];
$status = $_POST['status'];

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE tasks SET taskStatus = $status WHERE taskID = $taskId";
$conn->query($sql) === TRUE;


$conn->close();
?>
