import { expect, test } from "@playwright/test";

test.describe("Foo", (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.goto("/");
    });

    test("should have today's definitions", ({ page }): void => {
        // eslint-disable-next-line no-console
        console.log(page.url());
        expect(page.url()).toBe(process.env["BASE_URL"]);
    });
});
