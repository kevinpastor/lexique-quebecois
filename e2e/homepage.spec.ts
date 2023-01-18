import { expect, Locator, test } from "@playwright/test";

test.describe("Homepage", (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.goto("/");
    });

    test("should have title", async ({ page }): Promise<void> => {
        const title: Locator = page.locator("h1");
        await expect(title).toHaveText(/Lexique Québécois/);
    });

    test("should have today's definitions", async ({ page }): Promise<void> => {
        const cardTitles: Locator = page.locator("h2");
        await expect(cardTitles).toHaveCount(5);
    });

    test.describe("Desktop only", (): void => {
        test.skip(({ isMobile }): boolean => Boolean(isMobile));

        test("should not have a menu button", async ({ page }): Promise<void> => {
            const menuButton: Locator = page.getByRole("button", { name: "Menu" });
            await expect(menuButton).toHaveCount(0);
        });

        test("should have a theme button", async ({ page }): Promise<void> => {
            const themeButton: Locator = page.getByRole("button", { name: "Thème" });
            await expect(themeButton).toHaveCount(1);
        });
    });

    test.describe("Mobile only", (): void => {
        test.skip(({ isMobile }): boolean => !isMobile);

        test("should have a menu button", async ({ page }): Promise<void> => {
            const menuButton: Locator = page.getByRole("button", { name: "Menu" });
            await expect(menuButton).toHaveCount(1);
        });
    });
});
