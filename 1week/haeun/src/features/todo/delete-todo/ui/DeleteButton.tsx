import TrashIcon from '@/shared/assets/icons/trash_icon.svg?react';

export default function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <button className="hover:cursor-pointer" onClick={onClick}>
            <TrashIcon />
        </button>
    );
}
