import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
    component: () => (
        <div className="w-screen h-screen bg-gray-200 flex justify-center items-center">
            <Outlet />
            <TanStackRouterDevtools />
        </div>
    ),
});
