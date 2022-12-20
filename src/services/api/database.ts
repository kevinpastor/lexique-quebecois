import { AggregateOptions, Db, MongoClient } from "mongodb";

import { isDevelopmentEnvironment } from "@utils/misc/environment";

let mongoClientConnect: Promise<MongoClient> | undefined = undefined;

interface ExtendedGlobal {
    _mongoClientConnect?: Promise<MongoClient>;
}

export const getDatabase = async (): Promise<Db> => {
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
        throw new Error(`Could not connect to database. \n${error}`);
    }

    return mongoClient.db();
};

export const _closeMongoClient = async (): Promise<void> => {
    if (mongoClientConnect) {
        const mongoClient: MongoClient = await mongoClientConnect;

        await mongoClient.close();
    }
};

export const defaultAggregateOptions: AggregateOptions = {
    collation: {
        locale: "fr_CA"
    }
};
