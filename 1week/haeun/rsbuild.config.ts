import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { TanStackRouterRspack } from '@tanstack/router-plugin/rspack';
import { pluginSvgr } from '@rsbuild/plugin-svgr';

export default defineConfig({
    source: {
        entry: {
            index: './src/main',
        },
    },
    plugins: [pluginReact(), pluginSvgr()],
    tools: {
        rspack: {
            plugins: [
                TanStackRouterRspack({
                    target: 'react',
                    autoCodeSplitting: true,
                    routesDirectory: './src/app/routes',
                    generatedRouteTree: './src/app/routes/@generated/routeTree.gen.ts',
                    routeFileIgnorePrefix: '-',
                    quoteStyle: 'single',
                }),
            ],
        },
    },
});
