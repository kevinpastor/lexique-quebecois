import { NextRequest, type NextResponse } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { addWord } from "~/app/api/words/add-word";
import { POST } from "~/app/api/words/route";
import { sendEmail } from "~/app/api/words/send-email";
import { Method } from "~/types/method";
import { Status } from "~/types/status";
import { type WithToken } from "~/types/with-token";
import { WordClass } from "~/types/word-class";
import { type WordRequest } from "~/types/word-request";
import { RateLimiter } from "~/utils/api/middlewares/rate-limiter";
import { verifyHCaptcha } from "~/utils/misc/hcaptcha";

vi.mock("~/app/api/words/add-word", () => ({
    addWord: vi.fn()
}));

vi.mock("~/utils/misc/hcaptcha", () => ({
    verifyHCaptcha: vi.fn()
}));

vi.mock("~/app/api/words/send-email", () => ({
    sendEmail: vi.fn()
}));

const consumeMock = vi.spyOn(RateLimiter.prototype, "consume");

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};
const wordRequestWithCaptchaStub: WithToken<WordRequest> = {
    ...wordRequestStub,
    token: "10000000-aaaa-bbbb-cccc-000000000001"
};

const requestStub: NextRequest = new NextRequest(
    new URL("https://lexiquequebecois.com/api/words"),
    {
        ip: "127.0.0.1",
        method: Method.POST,
        body: JSON.stringify(wordRequestWithCaptchaStub)
    }
);

describe("POST", (): void => {
    beforeEach((): void => {
        consumeMock.mockReturnValue(false);
        vi.mocked(verifyHCaptcha).mockImplementation((token: string): Promise<boolean> => (
            Promise.resolve(token ? true : false)
        ));
        vi.mocked(sendEmail).mockResolvedValue(undefined);
    });

    it("should not allow empty request", async (): Promise<void> => {
        const requestStubWithNoBody: NextRequest = new NextRequest(
            new URL("https://lexiquequebecois.com/api/words"),
            {
                ip: "127.0.0.1",
                method: Method.POST
            }
        );

        const response: NextResponse = await POST(requestStubWithNoBody);

        expect(response.status).toBe(Status.BadRequest);
    });

    it("should not allow empty request", async (): Promise<void> => {
        const requestStubWithNoBody: NextRequest = new NextRequest(
            new URL("https://lexiquequebecois.com/api/words"),
            {
                ip: "127.0.0.1",
                method: Method.POST
            }
        );

        const response: NextResponse = await POST(requestStubWithNoBody);

        expect(response.status).toBe(Status.BadRequest);
    });

    it("should not allow missing captcha token request", async (): Promise<void> => {
        const requestStubWithWrongBody: NextRequest = new NextRequest(
            new URL("https://lexiquequebecois.com/api/words"),
            {
                ip: "127.0.0.1",
                method: Method.POST,
                body: JSON.stringify({ label: "gyu" })
            }
        );

        const response: NextResponse = await POST(requestStubWithWrongBody);

        expect(response.status).toBe(Status.BadRequest);
    });

    it("should not allow invalid request", async (): Promise<void> => {
        const requestStubWithWrongBody: NextRequest = new NextRequest(
            new URL("https://lexiquequebecois.com/api/words"),
            {
                ip: "127.0.0.1",
                method: Method.POST,
                body: JSON.stringify({
                    token: "10000000-aaaa-bbbb-cccc-000000000001",
                    label: "gyu"
                })
            }
        );

        const response: NextResponse = await POST(requestStubWithWrongBody);

        expect(response.status).toBe(Status.BadRequest);
    });

    it("should add word", async (): Promise<void> => {
        vi.mocked(addWord).mockResolvedValue(Status.Created);

        const response: NextResponse = await POST(requestStub);

        expect(response.status).toBe(Status.Created);
    });

    it("should limit requests", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await POST(requestStub);

        expect(response.status).toBe(Status.TooManyRequest);
    });
});
