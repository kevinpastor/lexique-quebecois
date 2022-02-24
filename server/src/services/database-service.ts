import { injectable } from "inversify";
import { Collection, Db, MongoClient } from "mongodb";

@injectable()
export class DatabaseService {

    private db?: Db;

    public async getCollection<T>(name: string): Promise<Collection<T>> {
        const db: Db = await this.getDb();

        return db.collection(name);
    }

    private async getDb(): Promise<Db> {
        if (!this.db) {
            const uri: string = DatabaseService.getUri();
            const client: MongoClient = new MongoClient(uri);

            try {
                await client.connect();
            }
            catch (error: unknown) {
                throw new Error(`Could not connect to database. \n${error}`);
            }

            this.db = client.db("quebecoisUrbain");
        }

        return this.db;
    }

    private static getUri(): string {
        if (!process.env.DB_CONNECTION) {
            throw new Error("Environment variable DB_CONNECTION is missing.");
        }

        return process.env.DB_CONNECTION;
    }

}
