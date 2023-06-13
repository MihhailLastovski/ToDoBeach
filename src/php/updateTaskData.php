<?php
require_once("conf.php");
if (isset($_POST['task_id']) && isset($_POST['column']) && isset($_POST['value'])) {
  $taskId = $_POST['task_id'];
  $column = $_POST['column'];
  $value = $_POST['value'];
  
  $sql = "UPDATE tasks SET $column = '$value' WHERE taskID = '$taskId'";
  $result = $conn->query($sql);
  
  if ($result) {
    echo "Success";
  } else {
    echo "Error";
  }
}

$conn->close();
?>