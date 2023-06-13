<?php
session_start();
require_once("conf.php");

function registerUser($conn, $username, $email, $password) {
  $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
  
  $stmt = $conn->prepare("INSERT INTO users (username, email, userPassword) VALUES (?, ?, ?)");
  $stmt->bind_param("sss", $username, $email, $hashedPassword);
  
  if ($stmt->execute()) {
    return true; 
  } else {
    return false; 
  }
}

function loginUser($conn, $username, $password) {
  $stmt = $conn->prepare("SELECT * FROM users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    $hashedPassword = $row['userPassword'];
    
    if (password_verify($password, $hashedPassword)) {
        $_SESSION['username'] = $username;
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

if (isset($_POST['register'])) {
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  
  $registrationStatus = registerUser($conn, $username, $email, $password);
  
  if ($registrationStatus) {
    header("Location: /t0dobeach/main.php");
    exit();
  } else {
    echo "Registration failed. Please try again.";
  }
}

if (isset($_POST['login'])) {
  $username = $_POST['login-username'];
  $password = $_POST['login-password'];
  
  $loginStatus = loginUser($conn, $username, $password);
  
  if ($loginStatus) {
    header("Location: /t0dobeach/main.php");
    exit();
  } else {
    echo "Invalid username or password. Please try again.";
  }
}

?>
