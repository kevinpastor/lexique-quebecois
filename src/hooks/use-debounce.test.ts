/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useDebounce } from "./use-debounce";

describe("useDebounce", (): void => {
    beforeEach((): void => {
        vi.useFakeTimers();
    });

    it("should initialize to the initial value", (): void => {
        const { result } = renderHook(() => useDebounce("My search query"));

        expect(result.current).toEqual("My search query");
    });

    it("should rerender after the default delay", (): void => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value),
            {
                initialProps: {
                    value: "My search query"
                }
            }
        );

        rerender({ value: "My updated search query" });

        expect(result.current).toEqual("My search query");

        vi.advanceTimersByTime(100);

        rerender({ value: "My updated search query" });

        expect(result.current).toEqual("My updated search query");
    });

    it("should rerender after the given delay", (): void => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 5000),
            {
                initialProps: {
                    value: "My search query"
                }
            }
        );

        rerender({ value: "My updated search query" });

        expect(result.current).toEqual("My search query");

        vi.advanceTimersByTime(5000);

        rerender({ value: "My updated search query" });

        expect(result.current).toEqual("My updated search query");
    });
});
