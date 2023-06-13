<?php
require_once("conf.php");
session_start();

$stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
$stmt->bind_param("s", $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$sql = "SELECT tasks.*, categories.categoryName, categories.priority FROM tasks JOIN categories ON tasks.categoryID = categories.categoryID WHERE tasks.userID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

$tasks = array();
while ($row = $result->fetch_assoc()) {
  $tasks[] = array(
    'taskName' => $row['taskName'],
    'taskEnd' => $row['taskDate'],
    'taskTime' => $row['taskTime'],
    'categoryName' => $row['categoryName'],
    'taskID' => $row['taskID'],
    'priority' => $row['priority'],
    'taskStatus' => $row['taskStatus']
  );
}

header('Content-Type: application/json');
echo json_encode($tasks);

$conn->close();
?>
