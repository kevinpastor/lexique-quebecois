import { Db, MongoClient } from "mongodb";

let database: Db | undefined = undefined;

export const getDatabase = async (): Promise<Db> => {
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
    }

    return database;
};
