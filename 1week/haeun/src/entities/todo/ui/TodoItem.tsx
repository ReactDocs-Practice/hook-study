import DeleteButton from '@/features/todo/delete-todo/ui/DeleteButton';
import { Checkbox } from '@/shared/ui/Checkbox';
import Todo from '../model/todo';

export default function TodoItem({ title, isDone, onDeleteTodo, onToggleTodo }: Todo & { onDeleteTodo: () => void; onToggleTodo: () => void }) {
    return (
        <li className="w-full bg-gray-100 flex flex-row justify-between p-3 rounded-lg">
            <Checkbox isDone={isDone} onCheckedChange={onToggleTodo} />
            <span className="font-semibold">{title}</span>
            <DeleteButton onClick={onDeleteTodo} />
        </li>
    );
}
