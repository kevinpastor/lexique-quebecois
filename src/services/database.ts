import { Db, MongoClient } from "mongodb";

let client: MongoClient;
let database: Db;

export const getDatabase = async (): Promise<Db> => {
    if (!database) {
        if (!process.env.MONGODB_URI) {
            throw new Error("Please add your Mongo URI to .env.local");
        }

        const uri: string = process.env.MONGODB_URI;
        client = new MongoClient(uri);

        try {
            await client.connect();
        }
        catch (error: unknown) {
            throw new Error(`Could not connect to database. \n${error}`);
        }

        database = client.db("quebecoisUrbain");
    }

    return database;
};
