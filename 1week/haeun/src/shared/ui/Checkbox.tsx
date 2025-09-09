import * as React from 'react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import CheckIcon from '@/shared/assets/icons/check_icon.svg?react';

import { cn } from '@/shared/lib/utils';

interface CheckboxProps extends Omit<React.ComponentProps<typeof CheckboxPrimitive.Root>, 'checked'> {
    isDone?: boolean;
}

function Checkbox({ className, isDone, ...props }: CheckboxProps) {
    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            checked={isDone}
            className={cn(
                'size-5 shrink-0 rounded-[4px] border border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 hover:border-gray-400 hover:cursor-pointer',
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator
                data-slot="checkbox-indicator"
                className="flex items-center justify-center text-current transition-none"
            >
                <CheckIcon className="w-[80%]" />
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    );
}

export { Checkbox };
