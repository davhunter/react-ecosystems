import React, { useState } from 'react';
import './NewTodoForm.css';
import { connect } from 'react-redux';
import { createTodo } from './actions';

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="new-todo-form">
      <input
        type="text"
        placeholder="Type your new todo here"
        className="new-todo-input"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="new-todo-button"
        onClick={() => {
          const isDuplicateText = todos.some(
            (todo) => todo.text === inputValue
          );
          if (!isDuplicateText) {
            onCreatePressed(inputValue);
            setInputValue('');
          }
        }}
      >
        Create Todo
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(createTodo(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
