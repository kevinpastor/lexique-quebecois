/**
 * @jest-environment jsdom
 */
import { renderHook } from "@testing-library/react-hooks";

import { useIsMounted } from "./use-mounted";

describe("useIsMounted", (): void => {
    it("should be mounted initially", (): void => {
        const { result } = renderHook((): (() => boolean) => useIsMounted());

        expect(result.current()).toBeTruthy();
    });

    it("should not be mounted after unmounting", (): void => {
        const { result, unmount } = renderHook((): (() => boolean) => useIsMounted());

        unmount();
        expect(result.current()).toBeFalsy();
    });
});
