/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";

import { BooleanUtilities, useBoolean } from "./use-boolean";

describe("useBoolean", (): void => {
    it("should initialize to true", (): void => {
        const { result } = renderHook((): BooleanUtilities => useBoolean(true));

        expect(result.current.value).toBeTruthy();
    });

    it("should initialize to false", (): void => {
        const { result } = renderHook((): BooleanUtilities => useBoolean(false));

        expect(result.current.value).toBeFalsy();
    });

    it("should set value", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.setValue(false);
        });

        rerender();
        expect(result.current.value).toBeFalsy();
    });

    it("should set to true", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(false));

        act((): void => {
            result.current.setTrue();
        });

        rerender();
        expect(result.current.value).toBeTruthy();
    });

    it("should set to false", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.setFalse();
        });

        rerender();
        expect(result.current.value).toBeFalsy();
    });

    it("should toggle", (): void => {
        const { result, rerender } = renderHook((): BooleanUtilities => useBoolean(true));

        act((): void => {
            result.current.toggle();
        });

        rerender();
        expect(result.current.value).toBeFalsy();

        act((): void => {
            result.current.toggle();
        });

        rerender();
        expect(result.current.value).toBeTruthy();
    });
});
