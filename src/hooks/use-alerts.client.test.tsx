import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { useAlerts } from "./use-alerts";
import { AlertsProvider } from "../app/_components/providers/alerts-provider";

describe("useAlerts", (): void => {
    describe("when not wrapped in the provider", (): void => {
        it("should throw", (): void => {
            vi.spyOn(console, "error").mockReturnValue();

            expect((): void => {
                renderHook(useAlerts);
            }).toThrow();
        });
    });

    describe("when wrapped in the provider", (): void => {
        it("should return the context", (): void => {
            const { result } = renderHook(
                () => useAlerts(),
                {
                    wrapper: ({ children }) => (
                        <AlertsProvider>
                            {children}
                        </AlertsProvider>
                    )
                }
            );

            expect(result.current).toBeDefined();
        });
    });
});
