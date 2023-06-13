<?php
require_once("conf.php");
session_start();

$stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
$stmt->bind_param("s", $_SESSION['username']);
$stmt->execute();
$result = $stmt->get_result();

$row = $result->fetch_assoc();
$userID = $row['userID'];

$sql = "SELECT categoryName, color FROM categories WHERE userID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $userID);
$stmt->execute();
$result = $stmt->get_result();

$categories = array();
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $category = array(
            "name" => $row["categoryName"],
            "color" => $row["color"]
        );
        $categories[] = $category;
    }
}

header("Content-Type: application/json");
echo json_encode($categories);

$conn->close();
?>
