import { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        axios.get('/api/tasks').then((response) => {
            setTasks(response.data);
        });
    }, []);

    const addTask = () => {
        axios
          .post('/api/tasks', { title: newTask, completed: false})
          .then((response) => {
            setTasks([...tasks, response.data]);
            setNewTask('');
          });      
    };
    const toggleComplete = (task) => {
        axios
          .patch(`/api/tasks/${task.id}/`, { completed: !task.completed })
          .then((response) => {
            const updatedTasks = tasks.map((t) =>
              t.id === task.id ? response.data : t
            );
            setTasks(updatedTasks);
          });
      };
      return (
        <div>
          <h1>To-Do List</h1>
          <ul>
            {tasks.map((task) => (
              <li
                key={task.id}
                style={{ textDecoration: task.completed ? "line-through" : "" }}
                onClick={() => toggleComplete(task)}
              >
                {task.title}
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      ); 
};

export default TodoList;