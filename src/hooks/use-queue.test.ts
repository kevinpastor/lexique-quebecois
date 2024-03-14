/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { type QueueUtility, useQueue } from "./use-queue";

describe("useQueue", (): void => {
    it("should initialize", (): void => {
        const { result } = renderHook((): QueueUtility<number> => useQueue());

        expect(result.current.queue).toEqual([]);
    });

    it("should initialize with the given value", (): void => {
        const { result } = renderHook((): QueueUtility<number> => useQueue([0]));

        expect(result.current.queue).toEqual([0]);
    });

    it("should enqueue a value", (): void => {
        const { result, rerender } = renderHook((): QueueUtility<number> => useQueue());

        result.current.enqueue(0);

        rerender();

        expect(result.current.queue).toEqual([0]);
    });

    it("should enqueue multiple values", (): void => {
        const { result, rerender } = renderHook((): QueueUtility<number> => useQueue());

        result.current.enqueue(0);
        result.current.enqueue(1);
        result.current.enqueue(2);

        rerender();

        expect(result.current.queue).toEqual([0, 1, 2]);
    });

    it("should dequeue a value", (): void => {
        const { result, rerender } = renderHook((): QueueUtility<number> => useQueue([0]));

        result.current.dequeue();

        rerender();

        expect(result.current.queue).toEqual([]);
    });

    it("should dequeue multiple values", (): void => {
        const { result, rerender } = renderHook((): QueueUtility<number> => useQueue([0, 1, 2]));

        result.current.dequeue();
        result.current.dequeue();
        result.current.dequeue();

        rerender();

        expect(result.current.queue).toEqual([]);
    });
});
