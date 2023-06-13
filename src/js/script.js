function toggleTheme() {
  var themeSwitch = document.getElementById('themeSwitch');
  
  if (themeSwitch.src.includes('sun')) {
    themeSwitch.src = 'https://s.svgbox.net/hero-outline.svg?ic=moon&fill=f6ad55';
  } else {
    themeSwitch.src = 'https://s.svgbox.net/hero-outline.svg?ic=sun&fill=f6ad55';
  }
  var body2 = document.body;
  var body = document.querySelector('.top',);
  var body3= document.querySelector('.container')

  if (body.style.backgroundColor == 'black') {
    body.style.backgroundColor = 'white';
    body.style.color = 'black';
  } else {
    body.style.backgroundColor = 'black';
    body.style.color = 'white';
  }
  if (body2.style.backgroundColor == 'black') {
    body2.style.backgroundColor = 'white';
    body2.style.color = 'black';
  } else {
    body2.style.backgroundColor = 'black';
    body2.style.color = 'white';
  }
  if (body3.style.backgroundColor == 'grey') {
    body3.style.backgroundColor = 'white';
    body3.style.color = 'grey';
  } else {
    body3.style.backgroundColor = 'grey';
    body3.style.color = 'white';
  }
 
  
}

function editTaskName(element) {
  var taskId = element.parentNode.getAttribute('data-task-id');
  
  var textarea = document.createElement('textarea');
  textarea.value = element.textContent;
  textarea.maxLength = 66; 
  textarea.style.border = 'none';
  textarea.style.fontSize = '18px';
  textarea.style.padding = '4px';
  textarea.style.width = '140px';
  textarea.style.height = '140px';
  textarea.style.backgroundColor = 'rgba(0, 0, 0, 0.05)';
  textarea.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  textarea.style.color = 'inherit';
  textarea.style.resize = 'vertical';
  textarea.style.outline = 'none'; 
  textarea.style.resize = 'none';

  element.parentNode.replaceChild(textarea, element);

  textarea.focus();

  textarea.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      element.textContent = textarea.value;
      textarea.parentNode.replaceChild(element, textarea);
      
      updateTaskData(taskId, 'taskName', textarea.value);
    }
  });
}

function editDate(element) {
  var taskId = element.parentNode.getAttribute('data-task-id');
  
  var input = document.createElement('input');
  input.type = 'date';
  input.value = element.textContent;
  
  element.parentNode.replaceChild(input, element);
  
  input.focus();
  
  input.addEventListener('blur', function() {
    element.textContent = input.value;
    input.parentNode.replaceChild(element, input);
    
    updateTaskData(taskId, 'taskDate', input.value);
  });
}
  
function editTime(element) {
  var taskId = element.parentNode.getAttribute('data-task-id');
  
  var input = document.createElement('input');
  input.type = 'time';
  input.value = element.textContent;
  
  element.parentNode.replaceChild(input, element);
  
  input.focus();
  
  input.addEventListener('blur', function() {
    element.textContent = input.value;
    input.parentNode.replaceChild(element, input);
    
    updateTaskData(taskId, 'taskTime', input.value);
  });
}

function updateTaskData(taskId, column, value) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/t0dobeach/src/php/updateTaskData.php', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = xhr.responseText;
      console.log(response);
    }
  };
  xhr.send('task_id=' + taskId + '&column=' + column + '&value=' + encodeURIComponent(value));
}


var listController = (function() {
  counter = 3;
  return {
      addItem: function() {
          counter += 1;
      },
      deleteItem: function(item) {
          counter -= 1;
      },
      returnTotalItems: function() {
          return counter;
      },
  }
})();
var UIController = (function() {
  var DOMstrings = {
      inputDescription: '.add__description',
      inputBtn: '.add__btn',
      todosContainer: '.todos__list',
      container: '.container',
      totalItems: '.total__items',
      addField: '.add',
      inputDate: '.add__date',
      inputTime: '.add__time',
      inputCategory: '.add__category',
  };
  var items = listController.returnTotalItems();
  return {
      getInput: function() {
          var description = document.querySelector(DOMstrings.inputDescription).value;
          var date = document.querySelector(DOMstrings.inputDate).value;
          var time = document.querySelector(DOMstrings.inputTime).value;
          var category = document.querySelector(DOMstrings.inputCategory).value; 
          return {
            description: description,
            date: date,
            time: time,
            category: category 
          };
      },
      addListItem: function() {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/t0dobeach/src/php/getTasks.php', true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            var tasks = JSON.parse(xhr.responseText);
            tasks.forEach(function(task) {
              var html, newHtml, element;
              element = DOMstrings.todosContainer;
              var gradients = [
                'linear-gradient(to bottom, rgba(255,190,11, 1) 0%, rgba(255,190,11, 0.8) 100%)', 
                'linear-gradient(to bottom, rgba(251, 86, 7, 1) 0%, rgba(251, 86, 7, 0.8) 100%)',
                'linear-gradient(to bottom, rgba(255,0,110, 1) 0%, rgba(255,0,110, 0.8) 100%)',
                'linear-gradient(to bottom, rgba(131, 56, 236, 1) 0%, rgba(131, 56, 236, 0.8) 100%)',
                'linear-gradient(to bottom, rgba(58,134,255, 1) 0%, rgba(58,134,255, 0.8) 100%)'
              ];
              var random_gradient = gradients[Math.floor(Math.random() * gradients.length)];
              html = '<div class="item" style="%style%;%styleBorder%;" data-task-id="%id%" data-task-priority="%priority%"> <div class="item__description" ondblclick="editTaskName(this)">%description%</div><div class="item__end" ondblclick="editDate(this)">%date%</div><div class="item__time" ondblclick="editTime(this)">%time%</div><div ondblclick="editCategory(this)">%category%</div><input type="checkbox" style="height: 20px; width: 20px" class="checkbox_status" %checkboxState% data-task-status="%status%"></input><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-trash-outline"></i></button></div></div>';
              newHtml = html
                .replace('%id%', task.taskID)
                .replace('%description%', task.taskName)
                .replace('%date%', task.taskEnd)
                .replace('%time%', task.taskTime)
                .replace('%category%', task.categoryName)
                .replace('%priority%', task.priority)
                .replace('%style%', 'background:' + random_gradient)
                .replace('%status%', task.taskStatus)
                .replace(
                  '%styleBorder%',
                  task.taskStatus == 0 ? '' : 'border: 6px solid #009900; text-decoration: line-through; color: #C0C0C0'
                )
                .replace(
                  '%checkboxState%',
                  task.taskStatus == 0 ? '' : 'checked'
                );
              
      
              document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            });
          }
        };
        xhr.send();
      },
      addListItemOne: function() {
        var items = listController.returnTotalItems();
        var html, newHtml, element;
        element = DOMstrings.todosContainer;
        var gradients = [
          'linear-gradient(to bottom, rgba(255,190,11, 1) 0%, rgba(255,190,11, 0.8) 100%)', 
          'linear-gradient(to bottom, rgba(251, 86, 7, 1) 0%, rgba(251, 86, 7, 0.8) 100%)',
          'linear-gradient(to bottom, rgba(255,0,110, 1) 0%, rgba(255,0,110, 0.8) 100%)',
          'linear-gradient(to bottom, rgba(131, 56, 236, 1) 0%, rgba(131, 56, 236, 0.8) 100%)',
          'linear-gradient(to bottom, rgba(58,134,255, 1) 0%, rgba(58,134,255, 0.8) 100%)'
        ];
        var random_gradient = gradients[Math.floor(Math.random() * gradients.length)];
        html = '<div class="item" style="%style%"> <div class="item__description" ondblclick="editTaskName(this)">%description%</div><div ondblclick="editDate(this)">%date%</div><div ondblclick="editTime(this)">%time%</div><div ondblclick="editCategory(this)">%category%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-trash-outline"></i></button></div></div>';
        
        newHtml = html
          .replace('%description%', document.querySelector(DOMstrings.inputDescription).value)
          .replace('%date%', document.querySelector(DOMstrings.inputDate).value)
          .replace('%time%', document.querySelector(DOMstrings.inputTime).value)
          .replace('%category%', document.querySelector(DOMstrings.inputCategory).value)
          .replace('%style%', 'background:' + random_gradient);
      
        document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },
      
      clearField: function() {
          document.querySelector(DOMstrings.inputDescription).value = '';
          document.querySelector(DOMstrings.inputDescription).focus();
      },
      displayTotalItems: function() {

      },
      displayDate: function () {
        var mydate = new Date();
      var year = mydate.getYear();
      if (year < 1000) {
          year+=1900;
      }
          var day = mydate.getDay();
          var month = mydate.getMonth();
          var daym = mydate.getDate();
          if (daym < 10) {
            daym = "0" + daym;
          }
          var dayarray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var montharray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var today = dayarray[day] + " "+ daym + " "+ montharray[month] + " " + year;
          document.getElementById('date').innerHTML = today;
      },
      
      getDOMstrings: function() {
          return DOMstrings;
      },
  };
})();
var controller = (function(listCtrl, UICtrl) {
  var DOM = UICtrl.getDOMstrings();
  var setupEventListeners = function() {
     document.querySelector(DOM.inputBtn).addEventListener('click', showAddField);
     document.querySelector(DOM.todosContainer).addEventListener('change', ctrlToggleTaskStatus);
      document.addEventListener('keypress', function(e) {
          if (e.keyCode === 13 || e.which === 13) {
              ctrlAddItem();
          };
      });
      document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
  };
  var updateTotalItems = function() {
      listController.returnTotalItems();
      UICtrl.displayBudget(budget);
  };
  var ctrlAddItem = function() {
    taskName = document.querySelector(DOM.inputDescription).value;
    if (taskName !== '') {
      listCtrl.addItem();
      UICtrl.addListItemOne();
      UICtrl.displayTotalItems();
      UICtrl.clearField();

      var formData = new FormData();
      formData.append('description', taskName);
      formData.append('date', document.querySelector(DOM.inputDate).value);
      formData.append('time', document.querySelector(DOM.inputTime).value);
      formData.append('category', document.querySelector(DOM.inputCategory).value);

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/t0dobeach/src/php/addTask.php', true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log(xhr.responseText);
        }
      };
      xhr.send(formData);
    }
  };
  var showAddField = function() {
      document.querySelector(DOM.addField).style.display = 'block';
      document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)
      document.querySelector(DOM.inputDescription).focus();
  }
  var updateTaskStatus = function(taskId, status) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/t0dobeach/src/php/updateTaskStatus.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        console.log(xhr.responseText);
      }
    };
    xhr.send('task_id=' + taskId + '&status=' + status);
  };
  
  var ctrlToggleTaskStatus = function(e) {
    var todo = e.target.parentNode;
    if (e.target && e.target.className === "checkbox_status") {
      var taskId = todo.getAttribute('data-task-id');
      var status = e.target.checked ? 1 : 0;
      todo.style.border = status === 0 ? '' : '6px solid #009900';
      todo.style.color = status === 0 ? '' : '#C0C0C0';
      todo.setAttribute('data-task-status', status);
      updateTaskStatus(taskId, status);
    }
  };
  
  var ctrlDeleteItem = function(e) {
    var todo = e.target.parentNode.parentNode.parentNode;
    if (e.target && e.target.className === "ion-ios-trash-outline") {
      var taskId = todo.getAttribute('data-task-id');
      todo.parentNode.removeChild(todo);
      listCtrl.deleteItem();
      console.log(taskId);
      $.ajax({
        url: '/t0dobeach/src/php/deleteTask.php', 
        type: 'POST',
        data: { task_id: taskId }, 
        success: function(response) {
          console.log(response);
        },
        error: function(error) {
          console.log('Error:', error); 
        }
      });
    }
    UICtrl.displayTotalItems();
  };
  return {
      init: function() {
          UICtrl.displayTotalItems();
          UICtrl.displayDate();
          setupEventListeners(); 
          UICtrl.addListItem();
      },
  };
})(listController, UIController);
controller.init();

function openLoginModal()
{
  var modal = document.getElementById("modalSignUp");
  modal.style.display = "block";
}

function closeLoginModal()
{
  var modal = document.getElementById("modalSignUp");
  modal.style.display = "none";
}

function toggleNavbar() {
  var navbar = document.getElementById("myNavbar");
  var computedStyle = window.getComputedStyle(navbar);

  if (computedStyle.display === "block") {
    navbar.style.display = "none";
  } else {
    navbar.style.display = "block";
    renderCategories();
  }
}

function renderCategories() {
  const categoryList = document.getElementById("categoryList");
  const selectElement = document.querySelector(".add__category");
  categoryList.innerHTML = "";
  selectElement.innerHTML = '<option value="" disabled selected>Select category</option>';

  fetch('/t0dobeach/src/php/getCategories.php')
    .then(response => response.json())
    .then(data => {
      data.forEach(category => {
        const listItem = document.createElement("li");
        listItem.className = "lbla";
        listItem.style.color = category.color;

        const categoryNameLabel = document.createElement("label");
        categoryNameLabel.className = "lbls";
        categoryNameLabel.textContent = category.name;
        listItem.appendChild(categoryNameLabel);

        
        const deleteButton = document.createElement("button");
        deleteButton.className = "categoryDel";
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", function() {
          deleteCategory(category.name);
        });
        listItem.appendChild(deleteButton);

        categoryList.appendChild(listItem);

        const optionElement = document.createElement("option");
        optionElement.value = category.name;
        optionElement.textContent = category.name;
        selectElement.appendChild(optionElement);
      });
    })
    .catch(error => console.error(error));
}


function deleteCategory(categoryName) {
  fetch('/t0dobeach/src/php/deleteCategory.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `categoryName=${encodeURIComponent(categoryName)}`
  })
    .then(response => response.text())
    .then(result => {
      console.log(result); 
      renderCategories();
    })
    .catch(error => console.error(error));
}

function openAddCategoryModal() {
  document.getElementById("modalAddCategory").style.display = "block";
}

function closeAddCategoryModal() {
  document.getElementById("modalAddCategory").style.display = "none";
}

document.getElementById('sortBtn').addEventListener('click', function() {
  var tasks = document.querySelectorAll('.item');
  tasks = Array.from(tasks);

  var sortOrder = this.dataset.sortOrder;
  if (!sortOrder) {
    sortOrder = 'desc';
  }
  if (sortOrder === 'desc') {
    tasks.sort(function(a, b) {
      var priorityA = parseInt(a.dataset.taskPriority);
      var priorityB = parseInt(b.dataset.taskPriority);
      return priorityB - priorityA;
    });
    this.dataset.sortOrder = 'asc';
    this.innerHTML = 'Sort by priority <i>▲</i>';
  } else {
    tasks.sort(function(a, b) {
      var priorityA = parseInt(a.dataset.taskPriority);
      var priorityB = parseInt(b.dataset.taskPriority);
      return priorityA - priorityB;
    });
    this.dataset.sortOrder = 'desc';
    this.innerHTML = 'Sort by priority <i>▼</i>';
  }

  var todosList = document.querySelector('.todos__list');
  tasks.forEach(function(task) {
    todosList.appendChild(task);
  });
});

document.getElementById('sortBtnDate').addEventListener('click', function() {
  var tasks = document.querySelectorAll('.item');
  tasks = Array.from(tasks);

  var sortOrder = this.dataset.sortOrder;
  if (!sortOrder) {
    sortOrder = 'asc';
  }
  if (sortOrder === 'asc') {
    tasks.sort(function(a, b) {
      var dateA = new Date(a.querySelector('[ondblclick="editDate(this)"]').textContent);
      var dateB = new Date(b.querySelector('[ondblclick="editDate(this)"]').textContent);
      return dateA - dateB;
    });
    this.dataset.sortOrder = 'desc';
    this.innerHTML = 'Sort by date <i>▲</i>';
  } else {
    tasks.sort(function(a, b) {
      var dateA = new Date(a.querySelector('[ondblclick="editDate(this)"]').textContent);
      var dateB = new Date(b.querySelector('[ondblclick="editDate(this)"]').textContent);
      return dateB - dateA;
    });
    this.dataset.sortOrder = 'asc';
    this.innerHTML = 'Sort by date <i>▼</i>';
  }

  var todosList = document.querySelector('.todos__list');
  tasks.forEach(function(task) {
    todosList.appendChild(task);
  });
});



function checkTaskTime() {
  var todos = document.querySelectorAll('.item');
  var currentTime = new Date();
  
  todos.forEach(function(todo) {
    var taskEndText = todo.querySelector('.item__end').textContent;
    var timeString = todo.querySelector('.item__time').textContent;

    var taskDateTime = new Date(taskEndText + ' ' + timeString); 

    var timeDifference = taskDateTime.getTime() - currentTime.getTime();
    if (timeDifference < 3600000 && timeDifference > 0) {
      showNotification(todo.querySelector('.item__description').textContent);
    } else {
    }
    
  });
}




function showNotification(taskName) {
  if (Notification.permission === 'granted') {
    var notification = new Notification('Task Reminder', {
      body: 'Task "' + taskName + '" is due now.'
    });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function(permission) {
      if (permission === 'granted') {
        var notification = new Notification('Task Reminder', {
          body: 'Task "' + taskName + '" is due now.'
        });
      }
    });

  }
}
if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
  Notification.requestPermission().then(function(permission) {
  });
}

setInterval(checkTaskTime, 60000);


