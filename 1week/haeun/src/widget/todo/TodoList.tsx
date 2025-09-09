import Todo from '@/entities/todo/model/todo';
import TodoItem from '@/entities/todo/ui/TodoItem';
import TodoFilter from '@/features/todo/filter-todo/TodoFilter';

export default function TodoList({
    selectedFilter,
    onDeleteTodo,
    todos,
    onFilterChange,
    onToggleTodo,
}: {
    onDeleteTodo: (id: number) => void;
    selectedFilter: 'all' | 'completed' | 'pending';
    todos: Todo[];
    onFilterChange: (filter: string) => void;
    onToggleTodo: (id: number) => void;
}) {
    const totalTodos = todos.length;
    const completedPercent =
        todos.length > 0 ? Math.floor((todos.filter((todo) => todo.isDone).length / todos.length) * 100) : '-';
    return (
        <div className="flex flex-col h-full gap-3 overflow-hidden">
            <div className="sticky w-full flex justify-between items-center flex-shrink-0">
                <TodoFilter selectedFilter={selectedFilter} onClickFilterButton={(filter) => onFilterChange(filter)} />
                <div className="text-sm font-bold">
                    총 {totalTodos}개 | 완료율 {completedPercent}%
                </div>
            </div>

            {todos.length > 0 && (
                <ul className="flex flex-col flex-1 gap-3 overflow-y-auto">
                    {todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            id={todo.id}
                            isDone={todo.isDone}
                            title={todo.title}
                            onDeleteTodo={() => onDeleteTodo(todo.id)}
                            onToggleTodo={() => onToggleTodo(todo.id)}
                        />
                    ))}
                </ul>
            )}
            {todos.length <= 0 &&
                (selectedFilter === 'completed' ? (
                    <span className="text-sm font-semibold text-gray-400 flex-1 flex items-center justify-center">
                        완료한 할 일이 없어요!
                    </span>
                ) : (
                    <span className="text-sm font-semibold text-gray-400 flex-1 flex items-center justify-center">
                        아직 할 일이 없어요!
                    </span>
                ))}
        </div>
    );
}
