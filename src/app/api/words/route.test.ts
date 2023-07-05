import { NextRequest, NextResponse } from "next/server";

import { Method } from "@models/method";
import { Status } from "@models/status";
import { WithCaptchaToken } from "@models/with-captcha-token";
import { WordClass } from "@models/word-class";
import { WordRequest } from "@models/word-request";
import { RateLimiter } from "@utils/api/middlewares/rate-limiter";
import { verifyHCaptcha } from "@utils/misc/hcaptcha";

import { addWord } from "./add-word";
import { POST } from "./route";
import { sendEmail } from "./send-email";

jest.mock("./add-word", () => ({
    addWord: jest.fn()
}));
const addWordMock = addWord as jest.MockedFunction<typeof addWord>;

jest.mock("@utils/misc/hcaptcha", () => ({
    verifyHCaptcha: jest.fn()
}));
const verifyHCaptchaMock = verifyHCaptcha as jest.MockedFunction<typeof verifyHCaptcha>;

jest.mock("./send-email", () => ({
    sendEmail: jest.fn()
}));
const sendEmailMock = sendEmail as jest.MockedFunction<typeof sendEmail>;

const consumeMock = jest.spyOn(RateLimiter.prototype, "consume");

const wordRequestStub: WordRequest = {
    label: "gyu",
    wordClasses: [WordClass.Adjectif],
    definition: "Bon/beau. Peut être utiliser comme adjectif pour de la bouffe qui goûte bonne, ou pour une belle personne.",
    example: "Le poulet était tellement gyu!",
    author: "Kevin"
};
const wordRequestWithCaptchaStub: WithCaptchaToken<WordRequest> = {
    ...wordRequestStub,
    captchaToken: "10000000-aaaa-bbbb-cccc-000000000001"
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
        verifyHCaptchaMock.mockImplementation((token: string): Promise<boolean> => (
            Promise.resolve(token ? true : false)
        ));
        sendEmailMock.mockResolvedValue(undefined);
    });

    afterEach((): void => {
        jest.resetAllMocks();
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

        expect(response.status).toBe(Status.Unauthorized);
    });

    it("should not allow invalid request", async (): Promise<void> => {
        const requestStubWithWrongBody: NextRequest = new NextRequest(
            new URL("https://lexiquequebecois.com/api/words"),
            {
                ip: "127.0.0.1",
                method: Method.POST,
                body: JSON.stringify({
                    captchaToken: "10000000-aaaa-bbbb-cccc-000000000001",
                    label: "gyu"
                })
            }
        );

        const response: NextResponse = await POST(requestStubWithWrongBody);

        expect(response.status).toBe(Status.BadRequest);
    });

    it("should add word", async (): Promise<void> => {
        addWordMock.mockResolvedValue(Status.Created);

        const response: NextResponse = await POST(requestStub);

        expect(response.status).toBe(Status.Created);
    });

    it("should limit requests", async (): Promise<void> => {
        consumeMock.mockReturnValue(true);

        const response: NextResponse = await POST(requestStub);

        expect(response.status).toBe(Status.TooManyRequest);
    });
});
