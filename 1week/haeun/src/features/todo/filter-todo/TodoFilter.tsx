import { ReactNode, useState } from 'react';
import { List, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/shared/lib/utils';

export default function TodoFilter({
    selectedFilter,
    onClickFilterButton,
}: {
    selectedFilter: string;
    onClickFilterButton: (filter: string) => void;
}) {
    return (
        <ul className="flex gap-2 border-b-1 border-gray-300">
            <FilteringButton
                key={1}
                buttonText="전체"
                onHandleClick={() => onClickFilterButton('all')}
                isSelected={selectedFilter === 'all'}
                icon={<List className="w-5" />}
            />
            <FilteringButton
                key={2}
                buttonText="완료"
                onHandleClick={() => onClickFilterButton('completed')}
                isSelected={selectedFilter === 'completed'}
                icon={<CheckCircle className="w-5" />}
            />
            <FilteringButton
                key={3}
                buttonText="미완료"
                onHandleClick={() => onClickFilterButton('pending')}
                isSelected={selectedFilter === 'pending'}
                icon={<Circle className="w-5" />}
            />
        </ul>
    );
}

type FilterButtonProps = {
    isSelected: boolean;
    onHandleClick: () => void;
    buttonText: string;
    icon: ReactNode;
};

function FilteringButton({ onHandleClick, buttonText, icon: Icon, isSelected }: FilterButtonProps) {
    return (
        <li
            className={cn('p-2 text-sm font-bold text-gray-500', isSelected && 'border-b-2 border-blue-800 text-black')}
        >
            <button className={'hover:cursor-pointer flex flex-row items-center gap-1'} onClick={onHandleClick}>
                {Icon}
                {buttonText}
            </button>
        </li>
    );
}
