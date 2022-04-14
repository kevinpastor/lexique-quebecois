import { Db, MongoClient } from "mongodb";

import { isDevelopmentEnvironment, isTestEnvironment } from "@utils/misc/environment";

let database: Db | undefined = undefined;

interface ExtendedGlobal {
    _database?: Db;
}

export const getDatabase = async (): Promise<Db> => {
    if (isTestEnvironment()) {
        throw new Error("Database should not be accessed in a test environment.");
    }

    // 2. Reassign database from cache
    if (isDevelopmentEnvironment()) {
        database = (global as ExtendedGlobal)._database;
    }

    if (!database) {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing in environment variables.");
        }

        const uri: string = process.env.MONGODB_URI;
        const client: MongoClient = new MongoClient(uri);

        try {
            await client.connect();
        }
        catch (error: unknown) {
            throw new Error(`Could not connect to database. \n${error}`);
        }

        database = client.db("quebecoisUrbain");

        // 1. Cache the database for hot reload
        if (isDevelopmentEnvironment()) {
            (global as ExtendedGlobal)._database = database;
        }
    }

    return database;
};
