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
