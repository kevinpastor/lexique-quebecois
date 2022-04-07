import { Db, MongoClient } from "mongodb";

import { getDatabase } from "./database";

jest.mock("mongodb");
const MongoClientMock = MongoClient as jest.MockedClass<typeof MongoClient>;

describe("@services", (): void => {
    describe("api", (): void => {
        describe("database", (): void => {
            describe("getDatabase", (): void => {
                const environment: NodeJS.ProcessEnv = process.env;

                beforeEach(() => {
                    jest.resetModules();
                    process.env = { ...environment };
                });

                afterAll(() => {
                    process.env = environment;
                });

                it("should throw in test environment", (): void => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    expect(getDatabase()).rejects.toBeDefined();
                });

                it("should throw without MONGODB_URI environment variable", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";

                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    expect(getDatabase()).rejects.toBeDefined();
                });

                it("should throw when unable to connect", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";
                    const mongoDbUri: string = "foo";
                    (process.env as Record<string, string>).MONGODB_URI = mongoDbUri;

                    MongoClientMock.mockImplementation((): MongoClient => ({
                        connect: jest.fn()
                            .mockRejectedValue(undefined)
                    } as Partial<MongoClient> as MongoClient));

                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    expect(getDatabase()).rejects.not.toBeUndefined();
                });

                it("should return database", async (): Promise<void> => {
                    (process.env as Record<string, string>).NODE_ENV = "production";
                    const mongoDbUri: string = "foo";
                    (process.env as Record<string, string>).MONGODB_URI = mongoDbUri;

                    const getDbMock = jest.fn()
                        .mockReturnValue({});
                    MongoClientMock.mockImplementation((): MongoClient => ({
                        connect: jest.fn(),
                        db: getDbMock
                    } as Partial<MongoClient> as MongoClient));

                    const database: Db = await getDatabase();

                    expect(MongoClientMock).toHaveBeenCalledWith(mongoDbUri);
                    expect(database).toBeDefined();
                });
            });
        });
    });
});
