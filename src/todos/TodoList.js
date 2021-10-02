import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { displayAlert } from './thunks';
import { isLoading } from './reducers';
import { loadTodos, removeTodoRequest, markTodoAsComplete } from './thunks';
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from './selectors';
import styled from 'styled-components';

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completedTodos,
  incompleteTodos,
  onRemovePressed,
  onCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadMessage = <div>Loading todos...</div>;

  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>Incomplete:</h3>
      {incompleteTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos.map((todo) => (
        <TodoListItem
          todo={todo}
          onRemovePressed={onRemovePressed}
          onCompletedPressed={onCompletedPressed}
        />
      ))}
    </ListWrapper>
  );

  return isLoading ? loadMessage : content;
};

const mapStateToProps = (state) => ({
  isLoading: getTodosLoading(state),
  completedTodos: getCompletedTodos(state),
  incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = (dispatch) => ({
  onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
  onCompletedPressed: (id) => dispatch(markTodoAsComplete(id)),
  startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
