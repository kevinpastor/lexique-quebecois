/**
 * @jest-environment jsdom
 */
import { useId } from "./use-id";

import { renderHook } from "@testing-library/react-hooks";

describe("@utils", (): void => {
    describe("hooks", (): void => {
        describe("use-id", (): void => {
            describe("useId", (): void => {
                it("should return id", (): void => {
                    const { result, rerender } = renderHook((): string => useId());

                    const id: string = result.current;
                    expect(id).not.toEqual("");

                    rerender();
                    expect(result.current).toEqual(id);
                });

                it("should generate multiple ids", (): void => {
                    const { result: { current: first } } = renderHook((): string => useId());
                    const { result: { current: second } } = renderHook((): string => useId());

                    expect(first).not.toEqual(second);
                });
            });
        });
    });
});
