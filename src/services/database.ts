import { type AggregateOptions, type Db, MongoClient } from "mongodb";

import { isDevelopmentEnvironment, isTestEnvironment } from "~/utils/misc/environment";

let mongoClientConnect: Promise<MongoClient> | undefined = undefined;

interface ExtendedGlobal {
    _mongoClientConnect?: Promise<MongoClient>;
}

const getMongoClient = async (): Promise<MongoClient> => {
    if (isTestEnvironment()) {
        throw new Error("getMongoClient should not be called in test environment.");
    }

    // 2. Reassign database from cache
    /* istanbul ignore if */
    if (isDevelopmentEnvironment()) {
        mongoClientConnect = (global as ExtendedGlobal)._mongoClientConnect;
    }

    if (!mongoClientConnect) {
        if (!process.env["MONGODB_URI"]) {
            throw new Error("MONGODB_URI is missing in environment variables.");
        }

        const uri: string = process.env["MONGODB_URI"];
        const mongoClient: MongoClient = new MongoClient(uri);

        mongoClientConnect = mongoClient.connect();

        // 1. Cache the MongoClient for hot reload
        /* istanbul ignore if */
        if (isDevelopmentEnvironment()) {
            (global as ExtendedGlobal)._mongoClientConnect = mongoClientConnect;
        }
    }

    let mongoClient: MongoClient | undefined = undefined;

    try {
        mongoClient = await mongoClientConnect;
    }
    catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new Error(`Could not connect to database. \n${error}`);
    }

    return mongoClient;
};

export const getDatabase = async (): Promise<Db> => {
    const mongoClient: MongoClient = await getMongoClient();

    return mongoClient.db();
};

export const defaultAggregateOptions: AggregateOptions = {
    collation: {
        locale: "fr_CA"
    }
};
