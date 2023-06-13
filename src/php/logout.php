<?php
session_start();
require_once("conf.php");

if (isset($_POST['logout'])) {
  session_unset();
  session_destroy();
  header("Location: /t0dobeach/main.php");
  exit();
}
?>
