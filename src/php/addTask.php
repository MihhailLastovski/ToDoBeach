<?php
require_once("conf.php");
session_start();
$description = $_POST['description'];
$date = $_POST['date'];
$time = $_POST['time'];
$category = $_POST['category'];
$taskStatus = 0;

$categoryStmt = $conn->prepare("SELECT categoryID FROM categories WHERE categoryName = ?");
$categoryStmt->bind_param("s", $category);
$categoryStmt->execute();
$categoryResult = $categoryStmt->get_result();

$categoryRow = $categoryResult->fetch_assoc();
$categoryID = $categoryRow["categoryID"];

$stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
$stmt->bind_param("s", $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$insertStmt = $conn->prepare("INSERT INTO tasks (taskDate, taskStatus, taskTime, taskName, categoryID, userID) VALUES (?, ?, ?, ?, ?, ?)");
$insertStmt->bind_param("ssssii", $date, $taskStatus, $time, $description, $categoryID, $userID);
$insertStmt->execute();

$stmt->close();
$categoryStmt->close();
$insertStmt->close();
$conn->close();

?>
