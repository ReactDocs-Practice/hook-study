import Todo from '@/entities/todo/model/todo';
import { useRef, useState } from 'react';

export default function TodoInput({ onAddTodo }: { onAddTodo: (title: string) => void }) {
    const [inputText, setInputText] = useState('');
    return (
        <section className="w-full flex gap-2">
            <input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg bg-gray-100 border border-gray-400"
                placeholder="새로운 할 일을 입력하세요..."
            />
            <button
                disabled={inputText === ''}
                onClick={() => {
                    onAddTodo(inputText);
                    setInputText('');
                }}
                className="flex-shrink-0 bg-blue-700 rounded-lg text-white px-4 py-3 hover:cursor-pointer"
            >
                추가하기
            </button>
        </section>
    );
}
