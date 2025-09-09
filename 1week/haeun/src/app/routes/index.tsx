import TodoPage from '@/pages/todo/TodoPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
    component: TodoPage,
});
