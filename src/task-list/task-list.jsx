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
  
  