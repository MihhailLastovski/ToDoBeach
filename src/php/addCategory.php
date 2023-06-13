<?php
require_once("conf.php");
session_start();

$categoryName = $_POST['categoryName'];
$priority = $_POST['priority'];
$color = $_POST['color'];

$stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
$stmt->bind_param("s", $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$stmt = $conn->prepare("INSERT INTO categories (categoryName, priority, color, userID) VALUES (?, ?, ?, ?)");
$stmt->bind_param("sisi", $categoryName, $priority, $color, $userID);
$stmt->execute();

$stmt->close();
$conn->close();
?>
