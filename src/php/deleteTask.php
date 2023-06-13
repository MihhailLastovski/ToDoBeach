<?php
session_start();
if (isset($_POST['task_id'])) {
    $taskId = $_POST['task_id'];
    require_once("conf.php");

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
    $stmt->bind_param("s", $_SESSION['username']);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $userID = $row['userID'];

        $deleteStmt = $conn->prepare("DELETE FROM tasks WHERE taskID = ? AND userID = ?");
        $deleteStmt->bind_param("ii", $taskId, $userID);
        if ($deleteStmt->execute()) {
            echo 'Task deleted successfully';
        } else {
            echo 'Error deleting task: ' . $conn->error;
        }
    } else {
        echo 'Invalid user';
    }

    // Закрываем соединение с базой данных
    $conn->close();
} else {
    echo 'Task ID not provided';
}
?>
