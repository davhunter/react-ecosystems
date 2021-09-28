import React from 'react';
import { hot } from 'react-hot-loader';
import { render } from 'react-dom';
import './App.css';
import TodoList from './todos/TodoList';

const App = () => {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
};

export default hot(module)(App);
