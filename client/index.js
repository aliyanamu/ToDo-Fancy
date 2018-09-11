let dueDateStr;

$("#calendar").datepicker({
  inline: true,
  firstDay: 1,
  showOtherMonths: true,
  minDate: 0,
  dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  dateFormat: "yy-mm-dd",
  inline: true,
  onSelect: function(dateText, inst) {
    let date = $(this).datepicker("getDate"),
      day = date.getDate(),
      month = date.getMonth() + 1,
      year = date.getFullYear();
    dueDateStr = day + "-" + month + "-" + year;
    $("#dueDate").val(day + "-" + month + "-" + year);
    $(".edit-input-date").val(dueDateStr);

    console.log(day + "-" + month + "-" + year);
  }
});

let nowdate = new Date();
let day = nowdate.getDate(),
  month = nowdate.getMonth() + 1,
  year = nowdate.getFullYear();
dueDateStr = day + "-" + month + "-" + year;

$("#dueDate").val(dueDateStr);

let todos = []; //This is your global array of TODOS

$.ajax({
  type: "GET",
  url: "http://localhost:3000/api/todos/list",
  dataType: "json"
})
  .done(function(result) {
    let todobj = {};
    result.todo.forEach(item => {
      (todobj.task = item.title),
        (todobj.desc = item.description),
        (todobj.date = item.date),
        (todobj.isCompleted = item.status);
      todos.push(todobj);
      todobj = {};
    });

    showTodos(todos);
  })
  .fail(function(result, textStatus, xhr) {
    alert(`error: ${result.status}
    STATUS: ${xhr}`);
  });

function showTodos(todos) {
  var todosListEl = $("#todos-list");

  todosListEl.html("");

  let index = 0;
  todos.forEach(function(todo) {
    var taskClasses = "todo-task" + (todo.isCompleted ? " is-completed" : "");

    todosListEl.append(`
        <li class="${taskClasses}" style="overflow:hidden; word-wrap: break-word; padding: 5px" value="${todo.isCompleted}">
            <div class="form-${index}"></div>
            <div class="intitle task-${index} ${todo.task}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})"><p>${todo.task}</p></div>
            <div class="indesc desc-${index} ${todo.desc}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})"><p>${todo.desc}</p></div>
            <div class="indate date-${index} ${todo.date}" onclick="toggleTodo('${todo.task}',${todo.isCompleted})">${dueDateStr}</div>
            <div class="buttons buttons-${index}" >
                <button class="edit-button" onclick="enterEditMode('${index}','${todo.task}', '${todo.desc}', '${todo.date}')"><i class="fa fa-edit"></i></button>
                <button class="delete-button"><i class="fa fa-trash" aria-hidden="true"></i></button>
                <button class="save-button"><i class="fa fa-save"></i></button>
                <button class="cancel-button" onclick="exitEditMode('${index}','${todo.task}', '${todo.desc}', '${todo.date}')"><i class="fa fa-times"></i></button>
            </div>
        </li>
        `);
    index++;
  });
}

function addTodo(title, desc, dueDate, isCompleted) {
  var errorMessage = null;

  if (!title || title.length === 0) {
    errorMessage = "Task cannot be empty.";
  } else {
    todos.forEach(function(todo) {
      if (todo.task === title) errorMessage = "Task already exists.";
    });
  }

  if (errorMessage) {
    showError(errorMessage);
    return;
  }

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/api/todos/list",
    data: {
      title: title,
      desc: desc,
      date: dueDate,
      isCompleted: isCompleted
    },
    dataType: "json"
  })
    .done(function(data) {
      if (data) window.location.reload();
      else alert("Sorry, your connection to database is interrupted");
    })
    .fail(err => {
      console.log(err, "masuk");
      alert(err.message);
    });
}

function showError(errorMessage) {
  $(".error-message")
    .html(errorMessage)
    .slideDown();
}

function toggleTodo(title, isCompleted) {
  console.log(title, isCompleted);

  $.ajax({
    method: "PUT",
    url: `http://localhost:3000/api/todos/list`,
    data: {
      title: title,
      isCompleted: !isCompleted
    },
    dataType: "json"
  })
    .done(function(data) {
      if (data) window.location.reload();
      else alert("Sorry, your connection to database is interrupted");
    })
    .fail(err => {
      console.log(err, "masuk");
      alert(err.message);
    });
}

function enterEditMode(index, title, desc, date) {
  console.log("into edit");

  $(`.buttons-${index} .save-button`).show();
  $(`.buttons-${index} .cancel-button`).show();
  $(`.buttons-${index} .edit-button`).hide();
  $(`.buttons-${index} .delete-button`).hide();

  $(`.task-${index}`).hide();
  $(`.desc-${index}`).hide();
  $(`.date-${index}`).hide();

  $(`.form-${index}`).addClass("form-open")
    .append(`<input type="text" name="title" class="edit-input edit-input-title" value="${title}" />
    <input type="text" name="desc" class="edit-input edit-input-desc" value="${desc}" />
    <input type="text" name="date" class="edit-input edit-input-date" value="${date}" readonly/>`);
}

function exitEditMode(index, title, desc, date) {
  console.log("exit edit");

  $(`.buttons-${index} .save-button`).hide();
  $(`.buttons-${index} .cancel-button`).hide();
  $(`.buttons-${index} .edit-button`).show();
  $(`.buttons-${index} .delete-button`).show();

  $(`.task-${index}`).show();
  $(`.desc-${index}`).show();
  $(`.date-${index}`).show();
  $(`.form-${index}`)
    .removeClass("form-open")
    .children()
    .remove();
}

// $(function () {

//       saveTask: function() {
//           var newTitle = $('.edit-input-title').val();
//           var newDesc = $('.edit-input-desc').val();
//           var newDate = $('.edit-input-date').val();

//           todos.forEach(function(todo) {
//               if (app.curTitle === todo.task) {
//                   todo.task = newTitle;
//                   todo.desc = newDesc;
//                   todo.date = newDate;
//               }
//           });
//           app.curTitle = newTitle;
//           app.curDesc = newDesc;
//           app.curDate = newDate;
//           app.exitEditMode.call(this);
//       },

//       deleteTask: function() {
//           var taskToDelete = $(this).parent('div').prev().prev().prev().closest("div").text();
//           var classToDelete = $(this).parents('li')
//           console.log(classToDelete)
//           var found = false;
//           let index = 0
//           todos.forEach(function(todo, index) {
//               if (!found && taskToDelete === todo.task) {
//                   todos.splice(index, 1);
//                   classToDelete.remove()
//                   found = true;
//                 }
//                 index++
//             });
//           app.showTodos();
//         //   window.location.reload()
//       },

//       showError: function(errorMessage) {
//           $('.error-message').html(errorMessage).slideDown();
//       },

//       clearError: function() {
//           $('.error-message').fadeOut();
//       }
//   };

//   $('#create-form button').css('background', 'green');
//   $('#create-form button').css({
//       color: 'white',
//       borderRadius: '8px'
//   });

//   app.showTodos();

//   $('#create-form').on('submit', app.addTodo);
//   $('create-input').on('keyup', app.clearError);
//   $('.todo-task').click(app.toggleTodo);
//   $('.edit-button').click(app.enterEditMode);
//   $('.cancel-button').click(app.exitEditMode);
//   $('.save-button').click(app.saveTask);
//   $('.delete-button').click(app.deleteTask);

// })
