<?php
require_once("conf.php");
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['categoryName'])) {
  $categoryName = $_POST['categoryName'];

  $stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
  $stmt->bind_param("s", $_SESSION['username']);
  $stmt->execute();
  $result = $stmt->get_result();

  $row = $result->fetch_assoc();
  $userID = $row['userID'];

  $stmt = $conn->prepare("DELETE FROM categories WHERE categoryName = ? AND userID = ?");
  $stmt->bind_param("si", $categoryName, $userID);

  if ($stmt->execute()) {
    echo "Category deleted successfully.";
  } else {
    echo "Error deleting category: " . $stmt->error;
  }

  $stmt->close();
} else {
  echo "Invalid request.";
}

$conn->close();
?>
