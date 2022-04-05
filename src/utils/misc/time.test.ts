import { delay } from "./time";

describe("@utils", (): void => {
    describe("misc", (): void => {
        describe("time", (): void => {
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
        });
    });
});
