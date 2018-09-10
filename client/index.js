let dueDateStr;

$('#calendar').datepicker({
  inline: true,
  firstDay: 1,
  showOtherMonths: true,
  minDate: 0,
  dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  dateFormat: 'yy-mm-dd',
  inline: true,
  onSelect: function(dateText, inst) { 
      var date = $(this).datepicker('getDate'),
          day  = date.getDate(),  
          month = date.getMonth() + 1,              
          year =  date.getFullYear();
          dueDateStr = day + '-' + month + '-' + year
      $("#dueDate").val(day + '-' + month + '-' + year);
      $(".edit-input-date").val(dueDateStr)
      
      console.log(day + '-' + month + '-' + year);
  },
  
});

let nowdate = new Date()
let day  = nowdate.getDate(),
month = nowdate.getMonth()+1,              
year =  nowdate.getFullYear();
dueDateStr = day + '-' + month + '-' + year

$("#dueDate").val(dueDateStr)

var todos = []
$.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:3000/api/todos/list',
    dataType: 'json'
})
.done (function (result) {
    
    let todobj = {}
    result.todo.forEach(item => {
        todobj.task = item.title,
        todobj.desc = item.description,
        todobj.date = item.date,
        todobj.isCompleted =item.status
        todos.push(todobj)
        todobj = {}
    });
    console.log(todos)
})
.fail(function(result, textStatus, xhr){
    alert(`error: ${result.status}
    STATUS: ${xhr}`);
});

$(function () {
var app = {
      showTodos: function() {
          var todosListEl = $('#todos-list');

          todosListEl.html('');

          todos.forEach(function(todo) {
              var taskClasses = 'todo-task' + (todo.isCompleted ? ' is-completed' : '');

              todosListEl.append(`
              <li class="${taskClasses}" style="overflow:hidden; word-wrap: break-word; padding: 5px">
                <div class="intitle ${todo.task}"><p>${todo.task}</p></div>
                <div class="indesc ${todo.desc}"><p>${todo.desc}</p></div>
                <div class="indate ${todo.date}">${dueDateStr}</div>
                <div class="buttons">
                    <button class="edit-button"><i class="fa fa-edit"></i></button>
                    <button class="delete-button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                    <button class="save-button"><i class="fa fa-save"></i></button>
                    <button class="cancel-button"><i class="fa fa-times"></i></button>
                </div>
              </li>
              `);
          });
      },

      addTodo: function() {

          var createInput = $('.create-input');
          var createInputValue = createInput.val();

          var errorMessage = null;

          if (!createInputValue) {
              errorMessage = 'Task cannot be empty.';
          } else {
              todos.forEach(function(todo) {
                  if (todo.task === createInputValue) {
                      errorMessage = 'Task already exists.'
                  }
              });
          }

          if (errorMessage) {
              app.showError(errorMessage);
              return;
          }

        todos.push({
            task: createInputValue,
            isCompleted: false
        })
        
        createInput.val('');

        // app.showTodos();
        document.location = './index.html'
      },

      toggleTodo: function() {
          todos.forEach(function(todo) {
              if (todo.task === $(this).children('div').first().text()) {
                console.log(todo.isCompleted)
                  if (todo.isCompleted) !todo.isCompleted
                  if (!todo.isCompleted) todo.isCompleted
              }
        }.bind(this));
          app.showTodos();
          document.location = './index.html'
          
      },

      enterEditMode: function() {
          var actionsCell = $(this).parent("div");
          var tasktitle = actionsCell.prev().prev().prev().closest("div");
          var taskdesc = actionsCell.prev().prev().closest("div");
          var taskdate = actionsCell.prev().closest("div");
          console.log(actionsCell)

          actionsCell.find('.save-button').show();
          actionsCell.find('.cancel-button').show();
          actionsCell.find('.edit-button').hide();
          actionsCell.find('.delete-button').hide();

          tasktitle.remove('intitle');
          taskdesc.hide();
          taskdate.hide();
          app.curTitle = tasktitle.text();
          app.curDesc = taskdesc.text();
          app.curDate = taskdate.text();
          tasktitle.html(`<input type="text" name="title" class="edit-input edit-input-title" value="${app.curTitle}" />
          <input type="text" name="desc" class="edit-input edit-input-desc" value="${app.curDesc}" />
          <input type="text" name="date" class="edit-input edit-input-date" value="${app.curDate}" readonly/>`);
      },

      exitEditMode: function() {
          var actionsCell = $(this).parent("div");
          var tasktitle = actionsCell.prev().prev().prev().closest("div");
          var taskdesc = actionsCell.prev().prev().closest("div");
          var taskdate = actionsCell.prev().closest("div");

          actionsCell.find('.save-button').hide();
          actionsCell.find('.cancel-button').hide();
          actionsCell.find('.edit-button').show();
          actionsCell.find('.delete-button').show();

          tasktitle.addClass('intitle');
          taskdesc.show();
          taskdate.show();
          tasktitle.html(app.curTitle);
          taskdesc.html(app.curDesc);
          taskdate.html(app.curDate);
      },

      saveTask: function() {
          var newTitle = $('.edit-input-title').val();
          var newDesc = $('.edit-input-desc').val();
          var newDate = $('.edit-input-date').val();

          todos.forEach(function(todo) {
              if (app.curTitle === todo.task) {
                  todo.task = newTitle;
                  todo.desc = newDesc;
                  todo.date = newDate;
              }
          });
          app.curTitle = newTitle;
          app.curDesc = newDesc;
          app.curDate = newDate;
          app.exitEditMode.call(this);
      },

      deleteTask: function() {
          var taskToDelete = $(this).parent('div').prev().prev().prev().closest("div").text();
          var classToDelete = $(this).parents('li')
          console.log(classToDelete)
          var found = false;
          let index = 0
          todos.forEach(function(todo, index) {
              if (!found && taskToDelete === todo.task) {
                  todos.splice(index, 1);
                  classToDelete.remove()
                  found = true;
                }
                index++
            });
          app.showTodos();
        //   window.location.reload()
      },

      showError: function(errorMessage) {
          $('.error-message').html(errorMessage).slideDown();
      },

      clearError: function() {
          $('.error-message').fadeOut();
      }
  };

  $('#create-form button').css('background', 'green');
  $('#create-form button').css({
      color: 'white',
      borderRadius: '8px'
  });

  app.showTodos();

  $('#create-form').on('submit', app.addTodo);
  $('create-input').on('keyup', app.clearError);
  $('.todo-task').click(app.toggleTodo);
  $('.edit-button').click(app.enterEditMode);
  $('.cancel-button').click(app.exitEditMode);
  $('.save-button').click(app.saveTask);
  $('.delete-button').click(app.deleteTask);

})

$.ajax({
    method:"POST",
    url: "http://localhost:3000/api/todos/list/",
    data: req.body
})
.done(function (data) {

    console.log(data, 'masuk')
    if (data) {
        todos.push({
            task: createInputValue,
            isCompleted: false
        })
        createInput.val('');
    } else {
        alert("Sorry, your connection to database is interrupted")
    }
})
.fail(err => {
    console.log(req.err, 'masuk')
    alert(err.message)
})