import React, { useState, useReducer } from 'react';

const initialState = [
    { id: 1, text: '장보기', completed: false },
    { id: 2, text: '병원 예약', completed: false },
    { id: 3, text: '공과금 납부', completed: true },
    { id: 4, text: '운동하기', completed: false },
    { id: 5, text: '책 읽기', completed: true },
    { id: 6, text: '엄마에게 전화하기', completed: false },
]

function reducer(state, action) {
  switch(action.type) {
    case 'todo_add' : {
      if (action.newTodo.trim()!=='') {
        return [...state, {id: Date.now(), text: action.newTodo, completed: false}]
      }
    }
    case 'todo_delete' : {
      return state.filter(todo => todo.id !== action.id)
    }
    case 'todo_complete' : {
      return state.map(todo => 
        todo.id === action.id ? {...todo, completed: !todo.completed} : todo) 
    }
    default:
      return state
  }
}

const App = () => {
  const [todos, dispatch] = useReducer(reducer, initialState); 
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');


  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'incomplete') return !todo.completed;
    return true;
  });

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;


  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <div className="relative flex size-full min-h-screen flex-col overflow-x-hidden">
        <div className="layout-container flex h-full grow flex-col">
          {/* Header */}
          <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 px-6 py-4 md:px-10">
            <div className="flex items-center gap-3 text-gray-800">
              <span className="text-3xl text-indigo-600">✓</span>
              <h1 className="text-2xl font-bold">할 일 관리</h1>
            </div>
            <div className="flex flex-1 justify-end gap-3 items-center">
              <button className="flex items-center justify-center rounded-full h-10 w-10 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800 transition-colors">
                <span className="text-xl">🔔</span>
              </button>
              <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 bg-indigo-500 flex items-center justify-center text-white font-bold">
                U
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="px-4 sm:px-6 md:px-8 lg:px-10 flex flex-1 justify-center py-8">
            <div className="layout-content-container flex flex-col w-full max-w-3xl">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                {/* Add Todo Section */}
                <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
                  <input 
                    className="flex-grow w-full rounded-lg border-gray-300 bg-gray-50 h-12 px-5 text-base text-gray-900 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 border" 
                    placeholder="새로운 할 일을 입력하세요..." 
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                  />
                  <button 
                    className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg h-12 px-6 bg-indigo-600 text-white font-bold text-base hover:bg-indigo-700 transition-colors duration-300"
                    onClick={() => dispatch({type: 'todo_add', newTodo: newTodo})}
                  >
                    <span className="text-xl">+</span>
                    add
                  </button>
                </div>

                {/* Filter Tabs and Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-5 gap-4">
                  <div className="flex border-b border-gray-200">
                    <button 
                      className={`flex items-center justify-center gap-1.5 border-b-[3px] px-4 py-2 text-sm font-semibold transition-colors ${
                        filter === 'all' 
                          ? 'border-indigo-600 text-gray-900' 
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      }`}
                      onClick={() => setFilter('all')}
                    >
                      <span className="text-lg">📋</span>
                      <span>전체</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center gap-1.5 border-b-[3px] px-4 py-2 text-sm font-medium transition-colors ${
                        filter === 'completed' 
                          ? 'border-indigo-600 text-gray-900' 
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      }`}
                      onClick={() => setFilter('completed')}
                    >
                      <span className="text-lg">✅</span>
                      <span>완료</span>
                    </button>
                    <button 
                      className={`flex items-center justify-center gap-1.5 border-b-[3px] px-4 py-2 text-sm font-medium transition-colors ${
                        filter === 'incomplete' 
                          ? 'border-indigo-600 text-gray-900' 
                          : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'
                      }`}
                      onClick={() => setFilter('incomplete')}
                    >
                      <span className="text-lg">⭕</span>
                      <span>미완료</span>
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>총 <span className="font-bold text-gray-800">{totalCount}</span>개 | 완료율 <span className="font-bold text-gray-800">{completionRate}%</span></p>
                  </div>
                </div>

                {/* Todo List */}
                <div className="space-y-3">
                  {filteredTodos.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      {filter === 'completed' && '완료된 할 일이 없습니다.'}
                      {filter === 'incomplete' && '미완료 할 일이 없습니다.'}
                      {filter === 'all' && '할 일이 없습니다.'}
                    </div>
                  ) : (
                    filteredTodos.map((todo) => (
                      <div key={todo.id} className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors group">
                        <label className="flex items-center gap-4 cursor-pointer flex-1">
                          <input 
                            className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-offset-0 focus:ring-offset-white focus:ring-indigo-500" 
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => dispatch({type: 'todo_complete', id: todo.id})}
                          />
                          <p className={`text-base truncate ${
                            todo.completed 
                              ? 'text-gray-500 line-through' 
                              : 'text-gray-800'
                          }`}>
                            {todo.text}
                          </p>
                        </label>
                        <button 
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          onClick={() => dispatch({type: 'todo_delete', id: todo.id})}
                        >
                          <span className="text-xl">🗑️</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;