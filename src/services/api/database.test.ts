import { Db, MongoClient } from "mongodb";
import { getDatabase } from "./database";

jest.mock("mongodb");
const MockedMongoClient = MongoClient as jest.MockedClass<typeof MongoClient>;

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

                it("should not work in test environment", (): void => {
                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    expect(getDatabase()).rejects.not.toBeUndefined();
                });

                it("should not work without MONGODB_URI environment variable", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";

                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                    expect(getDatabase()).rejects.not.toBeUndefined();
                });

                it("should throw error if unable to connect", (): void => {
                    (process.env as Record<string, string>).NODE_ENV = "production";
                    const mongoDbUri: string = "foo";
                    (process.env as Record<string, string>).MONGODB_URI = mongoDbUri;

                    MockedMongoClient.mockImplementation((): MongoClient => ({
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

                    const mockedGetDb = jest.fn()
                        .mockReturnValue({});
                    MockedMongoClient.mockImplementation((): MongoClient => ({
                        connect: jest.fn(),
                        db: mockedGetDb
                    } as Partial<MongoClient> as MongoClient));

                    const database: Db = await getDatabase();

                    expect(MockedMongoClient).toHaveBeenCalledWith(mongoDbUri);
                    expect(database).toBeDefined();
                });
            });
        });
    });
});
