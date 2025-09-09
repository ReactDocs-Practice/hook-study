import Todo from '@/entities/todo/model/todo';
import TodoInput from '@/features/todo/add-todo/TodoInput';
import TodoList from '@/widget/todo/TodoList';
import { useCallback, useMemo, useState } from 'react';

export const todoMockData: Todo[] = [
    { id: 1, isDone: false, title: '장보기' },
    { id: 2, isDone: true, title: '운동하기' },
    { id: 3, isDone: false, title: '프로젝트 회의 참석' },
    { id: 4, isDone: false, title: '영어 공부' },
    { id: 5, isDone: true, title: '빨래하기' },
    { id: 6, isDone: false, title: '친구와 저녁 약속' },
    { id: 7, isDone: true, title: '책 읽기' },
    { id: 8, isDone: false, title: '청소하기' },
];

export default function TodoPage() {
    const [todos, setTodos] = useState(todoMockData);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

    const filteredTodos = useMemo(() => {
        return todos.filter((todo) => {
            if (filter === 'completed') return todo.isDone;
            if (filter === 'pending') return !todo.isDone;
            return true;
        });
    }, [todos, filter]);

    const deleteTodo = useCallback((id: number) => {
        setTodos((prevTodos) => {
            const newTodos = [...prevTodos];
            return newTodos.filter((todo) => todo.id !== id);
        });
    }, []);

    const addTodo = useCallback((title: string) => {
        setTodos((prevTodos) => {
            const maxId = prevTodos.length > 0 ? Math.max(...prevTodos.map((t) => t.id)) : 0;
            const newTodos = [{ id: maxId + 1, title, isDone: false }, ...prevTodos];
            return newTodos;
        });
    }, []);

    const toggleTodo = useCallback((id: number) => {
        setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
    }, []);

    return (
        <main className="w-[70%] lg:w-[700px] h-[80%] p-5 bg-white rounded-lg border-1 border-gray-300 flex flex-col gap-3">
            <TodoInput onAddTodo={addTodo} />
            <TodoList
                todos={filteredTodos}
                onFilterChange={(filter) => setFilter(filter)}
                selectedFilter={filter}
                onDeleteTodo={deleteTodo}
                onToggleTodo={toggleTodo}
            />
        </main>
    );
}
