/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type BooleanUtilities, useBoolean } from "~/hooks/use-boolean";

describe("useBoolean", (): void => {
    it("should initialize to true", (): void => {
        const { result } = renderHook((): BooleanUtilities => useBoolean(true));

        expect(result.current.value).toBe(true);
    });

    it("should initialize to false", (): void => {
        const { result } = renderHook((): BooleanUtilities => useBoolean(false));

        expect(result.current.value).toBe(false);
    });

    it("should update the value", (): void => {
        const { result, rerender } = renderHook(
            ({ value }): BooleanUtilities => useBoolean(value),
            {
                initialProps: {
                    value: false
                }
            }
        );

        expect(result.current.value).toBe(false);

        rerender({ value: true });

        expect(result.current.value).toBe(true);
    });

    it("should set value", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.setValue(false);
        });

        rerender();
        expect(result.current.value).toBe(false);
    });

    it("should set to true", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(false));

        act((): void => {
            result.current.setTrue();
        });

        rerender();
        expect(result.current.value).toBe(true);
    });

    it("should set to false", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.setFalse();
        });

        rerender();
        expect(result.current.value).toBe(false);
    });

    it("should toggle", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.toggle();
        });

        rerender();
        expect(result.current.value).toBe(false);

        act((): void => {
            result.current.toggle();
        });

        rerender();
        expect(result.current.value).toBe(true);
    });
});
