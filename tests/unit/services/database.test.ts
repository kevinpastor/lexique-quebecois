import { describe, expect, it } from "@jest/globals";

import { getDatabase } from "~/services/database";

describe("getDatabase", (): void => {
    it("should throw in test environment", async (): Promise<void> => {
        await expect(getDatabase()).rejects.toBeDefined();
    });
});
