/**
 * @jest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";

import { NumberUtilities, useNumber } from "./use-number";

describe("useNumber", (): void => {
    it("should initialize", (): void => {
        const initialValue: number = 0;
        const { result } = renderHook((): NumberUtilities => useNumber(initialValue));

        expect(result.current.value).toEqual(initialValue);
    });

    it("should set value", (): void => {
        const initialValue: number = 0;
        const { result, rerender } = renderHook((): NumberUtilities => useNumber(initialValue));

        const newValue: number = 1;
        act((): void => {
            result.current.setValue(1);
        });

        rerender();
        expect(result.current.value).toEqual(newValue);
    });

    it("should increment", (): void => {
        const initialValue: number = 0;
        const { result, rerender } = renderHook((): NumberUtilities => useNumber(initialValue));

        act((): void => {
            result.current.increment();
        });

        rerender();
        expect(result.current.value).toEqual(initialValue + 1);
    });

    it("should decrement", (): void => {
        const initialValue: number = 0;
        const { result, rerender } = renderHook((): NumberUtilities => useNumber(initialValue));

        act((): void => {
            result.current.decrement();
        });

        rerender();
        expect(result.current.value).toEqual(initialValue - 1);
    });
});
