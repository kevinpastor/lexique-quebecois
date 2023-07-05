import type { Db } from "mongodb";

describe("getDatabase", (): void => {
    const environment: NodeJS.ProcessEnv = process.env;

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let getDatabase!: typeof import("./database").getDatabase;

    beforeEach(async (): Promise<void> => {
        jest.resetAllMocks();
        getDatabase = (await import("./database")).getDatabase;
        jest.resetModules();

        process.env = { ...environment };
    });

    afterAll((): void => {
        process.env = environment;
    });

    it("should throw without MONGODB_URI environment variable", async (): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete process.env["MONGODB_URI"];

        await expect(getDatabase()).rejects.toBeDefined();
    });

    it("should return database", async (): Promise<void> => {
        const database: Db = await getDatabase();

        expect(database).toBeDefined();
    });
});
