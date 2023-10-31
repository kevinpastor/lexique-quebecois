import { type Locator, expect, test } from "@playwright/test";

test.describe("Homepage", (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.goto("/");
        await page.getByRole("button", { name: "Accepter" }).click();
    });

    test("should have today's definitions", async ({ page }): Promise<void> => {
        const cardTitles: Locator = page.locator("h2");
        await expect(cardTitles).toHaveCount(7);
    });
});
