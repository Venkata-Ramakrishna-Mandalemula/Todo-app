import React, { useState } from 'react';
import './ToDo.css';
import { TodoForm } from './TodoForm';
import { TodoList } from './TodoList';
import { TodoDate } from './TodoDate';

const todokey = 'reactTodo';

export const ToDo = () => {
  const [task, setTask] = useState(() => {
    const rawTodos = localStorage.getItem(todokey);
    if (rawTodos) {
      return JSON.parse(rawTodos);
    } else {
      return [];
    }
  });

  const handleFormSubmit = (inputValue) => {
    const { id, content, checked } = inputValue;

    if (!content) return;
    // if (task.includes(inputValue)) return;
    // eslint-disable-next-line array-callback-return
    const ifTodoContentMatched = task.find((curTask) => {
      // eslint-disable-next-line no-unused-expressions
      curTask.content === content;
    });
    if (ifTodoContentMatched) return;

    setTask((prevTask) => [
      ...prevTask,
      { id: id, content: content, checked: checked },
    ]);
  };

  localStorage.setItem(todokey, JSON.stringify(task));

  const handleDeleteTodo = (value) => {
    const updatedTask = task.filter((curTask) => curTask.content !== value);
    setTask(updatedTask);
  };

  const handleClearTodoData = () => {
    setTask([]);
  };

  const handleCheckedTodo = (content) => {
    const updatedTask = task.map((curTask) => {
      if (curTask.content === content) {
        return { ...curTask, checked: !curTask.checked };
      } else {
        return curTask;
      }
    });
    setTask(updatedTask);
  };

  try {
    return (
      <section className="todo-container">
        <header>
          <h1>To-Do List</h1>
          <TodoDate />
        </header>
        <TodoForm onAddTodo={handleFormSubmit} />
        <section className="myUnOrdList">
          <ul>
            {task.map((curTask) => {
              return (
                <TodoList
                  key={curTask.id}
                  data={curTask.content}
                  checked={curTask.checked}
                  onHandleDeleteTodo={handleDeleteTodo}
                  onHandleCheckedTodo={handleCheckedTodo}
                />
              );
            })}
          </ul>
        </section>
        <section>
          <button className="clear-btn" onClick={handleClearTodoData}>
            Clear all
          </button>
        </section>
      </section>
    );
  } catch (error) {
    console.error('Error rendering ToDo component:', error);
    return <div>Error rendering component</div>;
  }
};
