<?php
session_start()
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>To Do List</title>
    <link rel="stylesheet" href="src/style/style.css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat+Alternates:200,300,400,700|Quicksand" rel="stylesheet"/>
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body onload="renderCategories()">
    <header>
      <button class="toggle-button" onclick="toggleNavbar()">☰</button>
      <img src="https://s.svgbox.net/hero-outline.svg?ic=moon&fill=f6ad55" onclick="toggleTheme()" id="themeSwitch" class="switch-moon" width="50" height="50">
      <h1>To Do List</h1>
        <?php
        if (isset($_SESSION['username'])) {
          echo '<div style="margin-right: 20px">'.$_SESSION['username'].'</div>';
          echo '<button id="logoutBtn">Logout</button>';
        } else {
          echo '<button id="loginBtn" onclick="openLoginModal()">Login/Register</button>';
        }
        ?>     
      <script>
        document.getElementById('logoutBtn').addEventListener('click', function() {
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/t0dobeach/src/php/logout.php', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
              window.location.href = '/t0dobeach/main.php';
            }
          };
          xhr.send('logout=true');
        });
      </script>
      <div class="navbar" id="myNavbar">
        <div>
          <label>Categories:</label>
          <ul id="categoryList"></ul>
        </div>   
        <div>
          <button onclick="openAddCategoryModal()">Add category</button>
        </div> 
      </div>         
    </header>
    <main>
    <div id="modalAddCategory" class="modalCategory">
      <div class="modal-contentCategory">
        <span class="closeCategory" onclick="closeAddCategoryModal()">&times;</span>
        <h2>Add Category</h2>
        <form id="addCategoryForm" method="POST">
          <input type="text" name="categoryName" class="categoryInput" placeholder="Enter category name" required>
          <input type="number" name="priority" class="categoryInput" placeholder="Enter category priority" required max="5" min="1">
          <input type="color" name="color" class="categoryInput" placeholder="Pick category color" required>
          <button type="submit" class="categorySubmit">Save</button>
        </form>        
        <script>
          document.getElementById("addCategoryForm").addEventListener("submit", function(event) {
          event.preventDefault(); 

          fetch("/t0dobeach/src/php/addCategory.php", {
            method: "POST",
            body: new FormData(this)
          })
          .then(response => {
            if (response.ok) {
              window.location.href = "main.php";
            } else {
              throw new Error("Error: " + response.status);
            }
          })
          .catch(error => {
            console.error(error);
          });
        });
        </script>        
      </div>
    </div>
    <div id="modalSignUp" class="modalSignUp">
      <div class="modal-content">
        <span class="close" onclick="closeLoginModal()">&times;</span>
        <div class="login-register">
          <form action="/t0dobeach/src/php/signUpIn.php" class="form" method="post" novalidate>
            <div class="action">
              <span class="load show" id="login-action" onclick="openLoginPage()">
                Login
              </span>
              <span class="load" onclick="openRegPage()" id="reg-action">
                Register
              </span>
            </div>
              <div class="reg">
                <input type="text" name="username" placeholder="Username" class="regInput" required />
                <input type="email" name="email" placeholder="Email" class="regInput" required />
                <input type="password" name="password" placeholder="Password" class="regInput" required />
                <button type="submit" name="register" class="regInput">Register</button>
                <a href="#" onclick="openLoginPage()" class="regInput">Login</a>
              </div>          
              <div class="login show-page">
                <input type="text" name="login-username" placeholder="Username" class="regInput" required />
                <input type="password" name="login-password" placeholder="Password" class="regInput" required />
                <button type="submit" name="login" class="regInput">Login</button>
                <a href="#" onclick="openRegPage()" class="regInput">Register</a>
              </div>
          </form>
          <script>
            function openLoginPage() {
              document.querySelector(".reg").classList.remove("show-page");
              document.querySelector(".login").classList.add("show-page");
              document.getElementById("login-action").classList.add("show");
              document.getElementById("reg-action").classList.remove("show");
            }
            function openRegPage() {
              document.querySelector(".reg").classList.add("show-page");
              document.querySelector(".login").classList.remove("show-page");
              document.getElementById("reg-action").classList.add("show");
              document.getElementById("login-action").classList.remove("show");
            }
          </script>
        </div>
      </div>
    </div> 
    <div class="wrapper">
      <div class="main-container">
        <div class="top">
          <div class="title">
           <h1 id="date">%date%</h1>
           <h2><span class="total__items"></span></h2>
         </div>
         <button class="add__btn">+</button>
       </div>
       <div class="bottom">
        <div class="add">
          <div class="add__container">
            <input type="text" class="add__description" placeholder="What would you like to do today?" maxLength ="66">
            <input type="date" class="add__date">
            <input type="time" class="add__time">
            <select class="add__category" >
              <option value="" disabled selected>Select category</option>
            </select>
          </div>
        </div>
        <button id="sortBtn" style="margin-left: 20px; margin-top: 15px;" class="btn btn--sort">Sort by priority</button>
        <button id="sortBtnDate" style="margin-left: 20px; margin-top: 15px;" class="btn btn--sort">Sort by date</button>
        <div class="container clearfix">
          <div class="todos">
            <div class="todos">
              <div class="todos__list">     
            </div>
          </div>
        </div>
      </div>
    </div></div></div>    
    <script src="./src/js/script.js"></script> 
  </body>
  </main>
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col">
          <div class="footer-about">
            <h6>About</h6>
            <p class="text-justify">This is a list of things you need to do or want to do. Traditionally, they are written on a piece of paper and arranged in order of priority. When a task is completed, it is usually crossed off the list.</p>
          </div>
        </div>
        <div class="col">
          <div class="footer-contributors">
            <h6>Who worked on this site</h6>
            <ul class="footer-links">
              <li><a href="https://github.com/Nevrinoma">Marco Lember</a></li>
              <li><a href="https://github.com/ednever">Edgar Neverovski</a></li>
              <li><a href="https://github.com/MihhailLastovski">Mihhail Lastovski</a></li>
              <li><a href="https://github.com/ArtjomVolkov">Artjom Volkov</a></li>
              <li><a href="https://github.com/IsabelValkrusman">Isabel Valkrusman</a></li>
            </ul>
          </div>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col">
          <div class="footer-text">
            <p>&copy; 2023 All Rights Reserved by <a href="#">T0 Do Beach</a>.</p>
          </div>
        </div>
        <div class="col">
          <div class="footer-social">
            <ul class="social-icons">
              <li><a class="github" href="https://github.com/Nevrinoma/t0dobeach"><i class="fa fa-github"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</html>
