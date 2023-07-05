import { Transporter, createTransport } from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

import { WordRequest } from "~types/word-request";
import { isInteger } from "@utils/misc/number";

export const sendEmail = async (wordRequest: WordRequest): Promise<void> => {
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

    if (!process.env["EMAIL_TO"]) {
        throw new Error("EMAIL_TO is missing in environment variables.");
    }
    const to: string = process.env["EMAIL_TO"];

    const transporter: Transporter<SMTPTransport.SentMessageInfo> = createTransport({
        host,
        port,
        secure: true,
        auth: {
            user,
            pass
        }
    });

    await transporter.sendMail({
        from,
        to,
        subject: "New definition submitted",
        text: `A new definition has been submitted.\n\n${JSON.stringify(wordRequest, null, 4)}`
    });
};
