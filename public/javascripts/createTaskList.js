
function postReq (taskListId) {
    const form = document.createElement('form');
    form.method = 'post';
    form.action = 'tasklist';
        
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = 'tasklistid';
        hiddenField.value = taskListId;
  
        form.appendChild(hiddenField);
     
  
    document.body.appendChild(form);
    form.submit();
}


function deleteList (taskListId) {
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'deleteTasklist';
      
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'tasklistid';
      hiddenField.value = taskListId;

      form.appendChild(hiddenField);
   

  document.body.appendChild(form);
  form.submit();
}

function deleteTask(taskId, tasklistId){
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'deleteTask';
      
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'taskid';
      hiddenField.value = taskId;

      const hiddenField2 = document.createElement('input');
      hiddenField2.type = 'hidden';
      hiddenField2.name = 'tasklistid';
      hiddenField2.value = tasklistId;

      form.appendChild(hiddenField);
      form.appendChild(hiddenField2);
   

  document.body.appendChild(form);
  form.submit();
}

function editList(rowId){
  var listName = $('#'+rowId+' td:first-child').html();
  var og = $('#'+rowId).html();
  var htm = '<td><input type="text" value="'+listName+'"></td><td><button type="button" onclick="updateList('+rowId+')">Update</button> </td>'
  $('#'+rowId).html(htm);
}


function updateList (rowId){
  var updatedName = $('#'+rowId+' :first-child :first-child').val();
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'updateTasklist';
      
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'tasklistid';
      hiddenField.value = rowId;

      const hiddenField2 = document.createElement('input');
      hiddenField2.type = 'hidden';
      hiddenField2.name = 'updatedName';
      hiddenField2.value = updatedName;

      form.appendChild(hiddenField);
      form.appendChild(hiddenField2);
   

  document.body.appendChild(form);
  form.submit();
}

function editTask(rowId, tasklistId){
  var taskName = $('#'+rowId+' td:first-child').html();
  var taskDesc = $('#'+rowId+' td:nth-child(2)').html();
  var htm = '<td><input type="text" value="'+taskName+'"></td><td><input type="text" value="'+taskDesc+'"></td>'+
  '<td><button type="button" onclick="updateTask('+rowId+' , '+tasklistId+')">Update</button> </td>'
  $('#'+rowId).html(htm);
}

function updateTask (rowId, tasklistId){
  var updatedName = $('#'+rowId+' :first-child :first-child').val();
  var updatedDesc = $('#'+rowId+' td:nth-child(2) input').val();
  const form = document.createElement('form');
  form.method = 'post';
  form.action = 'updateTask';
      

      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'taskid';
      hiddenField.value = rowId;

      const hiddenField2 = document.createElement('input');
      hiddenField2.type = 'hidden';
      hiddenField2.name = 'updatedName';
      hiddenField2.value = updatedName;

      const hiddenField3 = document.createElement('input');
      hiddenField3.type = 'hidden';
      hiddenField3.name = 'updatedDesc';
      hiddenField3.value = updatedDesc;

      const hiddenField4 = document.createElement('input');
      hiddenField4.type = 'hidden';
      hiddenField4.name = 'tasklistid';
      hiddenField4.value = tasklistId;

      form.appendChild(hiddenField);
      form.appendChild(hiddenField2);
      form.appendChild(hiddenField3);
      form.appendChild(hiddenField4);

      
  document.body.appendChild(form);
  form.submit();
}