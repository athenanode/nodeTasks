
function addTask() {
  var form_html = `
    <form action="createtask" method="POST">
        <input name="taskname" type="text" placeholder="task name" required/>
        <input name="taskdesc" type="text" placeholder="task description" />
        <button type="submit">create task</button>
    </form>
`;

  $("#taskFormDiv").append(form_html);
}

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