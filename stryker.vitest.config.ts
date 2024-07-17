import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: [
            ...defaultExclude,
            "./e2e/**"
        ],
        // Has its own workspace configuration since browser mode does not seem to be supported properly.
        workspace: "./stryker.vitest.workspace.ts",
        mockReset: true,
        unstubGlobals: true,
        unstubEnvs: true,
        sequence: {
            shuffle: true
        }
    },
    plugins: [
        react(),
        tsconfigPaths()
    ]
});
