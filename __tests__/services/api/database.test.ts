import type { Db, MongoClient } from "mongodb";

jest.mock("mongodb");

describe("getDatabase", (): void => {
    const environment: NodeJS.ProcessEnv = process.env;

    const connectMock = jest.fn();

    // eslint-disable-next-line @typescript-eslint/init-declarations
    let getDatabase!: typeof import("@services/api/database").getDatabase;
    // eslint-disable-next-line @typescript-eslint/init-declarations
    let MongoClientMock!: jest.MockedClass<typeof MongoClient>;

    beforeEach(async (): Promise<void> => {
        jest.resetAllMocks();

        MongoClientMock = (await import("mongodb")).MongoClient as jest.MockedClass<typeof MongoClient>;
        MongoClientMock.mockReturnValue({
            connect: connectMock
        } as Partial<MongoClient> as MongoClient);
        getDatabase = (await import("@services/api/database")).getDatabase;
        jest.resetModules();

        process.env = { ...environment };
    });

    afterAll((): void => {
        process.env = environment;
    });

    it("should throw in test environment", async (): Promise<void> => {
        await expect(getDatabase()).rejects.toBeDefined();
    });

    it("should throw without MONGODB_URI environment variable", async (): Promise<void> => {
        (process.env as Record<string, string>).NODE_ENV = "production";

        await expect(getDatabase()).rejects.toBeDefined();
    });

    it("should throw when unable to connect", async (): Promise<void> => {
        (process.env as Record<string, string>).NODE_ENV = "production";
        (process.env as Record<string, string>).MONGODB_URI = "mongodb_uri";

        connectMock.mockRejectedValue(undefined);

        MongoClientMock.mockReturnValue({
            connect: jest.fn()
                .mockRejectedValue(undefined)
        } as Partial<MongoClient> as MongoClient);

        await expect(getDatabase()).rejects.not.toBeUndefined();
    });

    it("should return database", async (): Promise<void> => {
        (process.env as Record<string, string>).NODE_ENV = "production";
        (process.env as Record<string, string>).MONGODB_URI = "mongodb_uri";

        connectMock.mockResolvedValue({
            db: jest.fn()
                .mockReturnValue({} as Partial<Db> as Db)
        } as Partial<MongoClient> as MongoClient);

        const database: Db = await getDatabase();

        expect(MongoClientMock).toHaveBeenCalledWith("mongodb_uri");
        expect(database).toBeDefined();
    });
});
