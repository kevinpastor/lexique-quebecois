// @ts-check
import { defineConfig, defaultExclude, coverageConfigDefaults, configDefaults } from "vitest/config"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"

export default defineConfig({
    test: {
        exclude: [
            ...defaultExclude,
            "e2e/**"
        ],
        coverage: {
            reporter: [
                "text",
                "html"
            ],
            include: [
                "src/**/*",
            ],
            exclude: [
                ...coverageConfigDefaults.exclude,
                "**/*.tsx",
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
    ],
});
