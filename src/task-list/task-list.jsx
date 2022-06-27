import React, { Component } from "react";
import { Card, Header, Form, Input, Icon } from "semantic-ui-react";
import "../task-list/task-list.css";

class TaskList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            task: "",
            tasklist:[]
        };
}

 //get the task list
 componentDidMount = () => {
    this.getTasks();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  
// ADD Task List
  onSubmit = () => {
    // check is task is empty string
    if (this.state.task) {
      // get the task list from the local storage
      let tasklist = JSON.parse(localStorage.getItem("tasklist"));

      // task list is null means empty
      // create an empty list
      if (tasklist == null) {
        tasklist = [];
      }

    // create task object
      // default status is false
      let task = {
        task: ` ${this.state.task}`,
        status: false
      };

      // add the task to the list
      tasklist.push(task);

      // save the task list in the local storage
      localStorage.setItem("tasklist", JSON.stringify(tasklist));

      // clear the form
      this.setState({ task: "" });

      // refresh the tasks
      this.getTasks();
    }
  };
  // get all the tasks
  getTasks = () => {
    // get the task list from the local storage
    let tasklist = JSON.parse(localStorage.getItem("tasklist"));

    // check if task list is empty
    if (tasklist) {
      // sort all the tasks on the basis of status
      // completed task will move down
      tasklist = tasklist.sort((a, b) => {
        if (a.status) {
          return 1;
        } else if (b.status) {
          return -1;
        }
        return 0;
      });
    
// save the task list in the local storage
localStorage.setItem("tasklist", JSON.stringify(tasklist));

// set the tasklist to the state
this.setState({
  // default color
  // Incomplete: blue
  // complete: green
  tasklist: tasklist.map((item, index) => {
    let color = "blue";
    let cardBackground = { background: "white" };
    let taskComplete = { textDecoration: "none" };

    if (item.status) {
      color = "green";
      cardBackground.background = "beige";
      taskComplete["textDecoration"] = "line-through";
    }
    return (
      <Card key={index} color={color} image style={cardBackground}>
        <Card.Content>
          <Card.Header textAlign="left" style={taskComplete}>
            <div style={{ wordWrap: "break-word" }}>{item.task}</div>
          </Card.Header>

          <Card.Meta textAlign="right">
            <Icon
              link
              name="check circle"
              color="green"
              onClick={() => this.updateTask(index)}
            />
            <span style={{ paddingRight: 10 }}>Complete</span>
            <Icon
              link
              name="undo"
              color="blue"
              onClick={() => this.undoTask(index)}
            />
            <span style={{ paddingRight: 10 }}>Undo</span>
            <Icon
              link
              name="delete"
              color="red"
              onClick={() => this.deleteTask(index)}
            />
            <span style={{ paddingRight: 10 }}>Delete</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    );
  })
});
}
};

// update the task status to true
updateTask = index => {
// get the task list from the local storage
let tasklist = JSON.parse(localStorage.getItem("tasklist"));
// change status to true
tasklist[index].status = true;
// save the updated task list
localStorage.setItem("tasklist", JSON.stringify(tasklist));
// refresh the task list
this.getTasks();
};

// undone the task status from true to false
undoTask = index => {
// get the task list from the local storage
let tasklist = JSON.parse(localStorage.getItem("tasklist"));
// change status to false
tasklist[index].status = false;
// save the updated task list
localStorage.setItem("tasklist", JSON.stringify(tasklist));
// refresh the task list
this.getTasks();
};

// delete the task from the task list
deleteTask = index => {
// get the task list from the local storage
let tasklist = JSON.parse(localStorage.getItem("tasklist"));
// remove the task from the task list
tasklist.splice(index, 1);
// save the updated task list
localStorage.setItem("tasklist", JSON.stringify(tasklist));
// refresh the task list
this.getTasks();
};

render() {
return (
<div>
  <div>
    <Header as="h1">
      <div className="app-header">Task List</div>{" "}
    </Header>
  </div>
  <div className="app-form">
    <Form onSubmit={this.onSubmit}>
      <Input
        type="text"
        name="task"
        onChange={this.onChange}
        value={this.state.task}
        fluid
        placeholder="Add Task..."
      />
    </Form>
  </div>
  <div>
    <Card.Group>{this.state.tasklist}</Card.Group>
  </div>
</div>
);
}
}

export default TaskList;  