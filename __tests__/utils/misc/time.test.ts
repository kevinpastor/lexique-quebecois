import { delay } from "@utils/misc/time";

describe("delay", (): void => {
    beforeEach((): void => {
        jest.useFakeTimers();
    });

    afterEach((): void => {
        jest.useRealTimers();
    });

    it("should delay the promise", async (): Promise<void> => {
        const promise: Promise<void> = delay(100);

        jest.runAllTimers();
        await expect(promise).resolves.not.toThrow();
    });
});
