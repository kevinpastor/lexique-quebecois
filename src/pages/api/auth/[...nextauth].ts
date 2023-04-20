import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth, { AuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";

import { getMongoClient } from "@services/api/database";
import { isInteger } from "@utils/misc/number";

const getEmailProviderOptions = (): Parameters<typeof EmailProvider>[0] => {
    if (!process.env["EMAIL_SERVER_HOST"]) {
        throw new Error("EMAIL_SERVER_HOST is missing in environment variables.");
    }
    const host: string = process.env["EMAIL_SERVER_HOST"];

    if (!process.env["EMAIL_SERVER_PORT"]) {
        throw new Error("EMAIL_SERVER_PORT is missing in environment variables.");
    }
    const rawPort: string = process.env["EMAIL_SERVER_PORT"];
    if (!isInteger(rawPort)) {
        throw new Error("EMAIL_SERVER_PORT is not a number.");
    }
    const port: number = parseInt(rawPort, 10);

    if (!process.env["EMAIL_SERVER_USER"]) {
        throw new Error("EMAIL_SERVER_USER is missing in environment variables.");
    }
    const user: string = process.env["EMAIL_SERVER_USER"];

    if (!process.env["EMAIL_SERVER_PASSWORD"]) {
        throw new Error("EMAIL_SERVER_PASSWORD is missing in environment variables.");
    }
    const pass: string = process.env["EMAIL_SERVER_PASSWORD"];

    if (!process.env["EMAIL_FROM"]) {
        throw new Error("EMAIL_FROM is missing in environment variables.");
    }
    const from: string = process.env["EMAIL_FROM"];

    return {
        server: {
            host,
            port,
            auth: {
                user,
                pass
            }
        },
        from
    };
};

const mongoClientPromise = getMongoClient();

export const options: AuthOptions = {
    adapter: MongoDBAdapter(mongoClientPromise),
    providers: [
        EmailProvider(getEmailProviderOptions())
    ],
    callbacks: {
        signIn: ({ user: { email } }): boolean => {
            if (!process.env["AUTHENTICATION_WHITELIST"]) {
                console.error("AUTHENTICATION_WHITELIST is missing in environment variables.");
                return false;
            }

            const whitelist: Array<string> = process.env["AUTHENTICATION_WHITELIST"].split(",");

            return typeof email === "string" && whitelist.includes(email);
        }
    },
    pages: {
        signIn: "/connexion",
        // signOut: "/",
        // error: "/",
        // verifyRequest: "/",
        newUser: "/"
    }
};

export default NextAuth(options);
