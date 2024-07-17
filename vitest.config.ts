import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { coverageConfigDefaults, defaultExclude, defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: [
            ...defaultExclude,
            "./e2e/**",
            "./.stryker-tmp/**"
        ],
        coverage: {
            provider: "istanbul",
            reporter: [
                "text",
                "html"
            ],
            include: [
                "./src/**"
            ],
            exclude: [
                ...coverageConfigDefaults.exclude
            ],
            thresholds: {
                branches: 70,
                functions: 70
                // lines: 70
                // statements: 70
            }
        },
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
