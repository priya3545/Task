import React, { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [taskData, setTaskData] = useState([]);
  const data = [
    {
      task: "Clean bedroom",
      subtasks: [
        { name: "Do laundry", complete: false },
        { name: "Organize desk", complete: false },
        { name: "Wipe floors", complete: false },
      ],
    },
    {
      task: "Study",
      subtasks: [
        { name: "Review chemistry", complete: false },
        { name: "Do a React coding challenge", complete: false },
      ],
    },
    {
      task: "Build website",
      subtasks: [
        { name: "Choose tech stack", complete: false },
        { name: "Design pages", complete: false },
        { name: "Develop", complete: false },
        { name: "Publish", complete: false },
      ],
    },
  ];
  useEffect(() => {
    function getData() {
      return data;
    }
    let updateData = getData();
    setTaskData([...updateData]);
  }, []);
  const handleToggleChange = (taskIndex, subTaskIndex) => {
    const updateTask = [...taskData];
    const newCheckList = updateTask.map((tasks, index) => {
      let updatedSubTasks;
      if (taskIndex === index) {
        updatedSubTasks = tasks.subtasks.map((subtask, index) => {
          return index === subTaskIndex
            ? { ...subtask, complete: true }
            : { ...subtask };
        });
      }
      return {
        ...tasks,
        subtasks: updatedSubTasks ?? tasks.subtasks,
      };
    });

    setTaskData(newCheckList);
  };
  const handleDelete = (taskIndex, subTaskIndex) => {
    const deleteTask = [...taskData];
    const afterDeletedList = deleteTask.map((tasks, index) => {
      let updatedSubTasks;
      if (taskIndex === index) {
        updatedSubTasks = tasks.subtasks.filter((subtask, index) => {
          return index !== subTaskIndex;
        });
      }
      return { ...tasks, subtasks: updatedSubTasks ?? tasks.subtasks };
    });
    setTaskData(afterDeletedList);
  };
  return (
    <div>
      <h2>List of Task and Subtasks</h2>
      {taskData.map((tasks, index) => {
        return (
          <ul>
            {tasks.task}
            {tasks.subtasks.map((subtask, i) => {
              return (
                <span>
                  <li style={{ listStyle: "none" }}>
                    {subtask.name}
                    <button
                      className={`btn ${
                        subtask.complete ? "updateBtn" : "beforeUpdateBtn"
                      }`}
                      style={{ marginRight: "15px", marginLeft: "15px" }}
                      onClick={() => handleToggleChange(index, i)}
                    >
                      {subtask.complete ? "Completed" : "Uncompleted"}
                    </button>
                    <button
                      className="btn deleteBtn"
                      onClick={() => handleDelete(index, i)}
                    >
                      Delete
                    </button>
                  </li>
                </span>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
}

export default App;
