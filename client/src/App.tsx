import React from 'react';
import './App.css';
import TodoApp from './components/TodoInput';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Todo-App</h1>
      <TodoApp />
    </div>
  );
}

export default App;
