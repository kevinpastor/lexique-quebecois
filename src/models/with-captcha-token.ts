import { object, string } from "zod";

export type WithCaptchaToken<T> = T & {
    captchaToken: string;
};

export const withCaptchaTokenSchema = object({
    captchaToken: string()
})
    .strict();
