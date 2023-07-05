import { getDatabase } from "./database";

describe("getDatabase", (): void => {
    it("should throw in test environment", async (): Promise<void> => {
        await expect(getDatabase()).rejects.toBeDefined();
    });
});
