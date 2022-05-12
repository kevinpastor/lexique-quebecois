/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { MutableRefObject } from "react";

import { RecursivePartial } from "@utils/types/recursive-partial";

import { useAutoResize } from "./use-auto-resize";

describe("useAutoResize", (): void => {
    it("should resize", (): void => {
        const ref: HTMLTextAreaElement = {
            style: {}
        } as RecursivePartial<HTMLTextAreaElement> as HTMLTextAreaElement;
        const { result, rerender } = renderHook((): MutableRefObject<HTMLTextAreaElement | undefined> => useAutoResize());

        result.current.current = ref;
        expect(result.current.current.style.height).toBeUndefined();

        result.current.current.value = "gyu";

        rerender();
        expect(result.current.current.style.height).toEqual("auto");

        const scrollHeight: number = 15;

        (result.current.current.scrollHeight as number) = scrollHeight;
        rerender();
        expect(result.current.current.style.height).toEqual(`${scrollHeight}px`);
    });

    it("should handle faulty side effect", (): void => {
        const ref: HTMLTextAreaElement = {
            style: {
                height: "15px"
            }
        } as RecursivePartial<HTMLTextAreaElement> as HTMLTextAreaElement;
        const { result, rerender } = renderHook((): MutableRefObject<HTMLTextAreaElement | undefined> => useAutoResize());

        result.current.current = ref;

        rerender();
        expect(result.current.current.style.height).toEqual("15px");
    });
});
