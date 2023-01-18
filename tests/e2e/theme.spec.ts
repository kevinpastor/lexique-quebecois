import { expect, Locator, test } from "@playwright/test";

test.describe("Theme", (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.goto("/");
    });

    test.describe("Color Scheme", (): void => {
        test.describe("Light", (): void => {
            test.use({ colorScheme: "light" });

            test("should respect color scheme", async ({ page }): Promise<void> => {
                const html: Locator = page.locator("html");
                await expect(html).toHaveAttribute("data-mui-color-scheme", "light");
            });
        });

        test.describe("Dark", (): void => {
            test.use({ colorScheme: "dark" });

            test("should respect color scheme", async ({ page }): Promise<void> => {
                const html: Locator = page.locator("html");
                await expect(html).toHaveAttribute("data-mui-color-scheme", "dark");
            });
        });
    });

    test.describe("Desktop only", (): void => {
        test.skip(({ isMobile }): boolean => Boolean(isMobile));

        test("should have a theme button directly", async ({ page }): Promise<void> => {
            const themeButton: Locator = page.getByRole("button", { name: "Thème" });
            await expect(themeButton).toHaveCount(0);
        });

        test("should update theme", async ({ page }): Promise<void> => {
            await expect(page.getByRole("button", { name: "Thème" })).toBeVisible();

            await page.getByRole("button", { name: "Thème" }).click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "light");

            await page.getByRole("button", { name: "Thème" }).click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });

        test("should retain theme", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Thème" }).click();
            await page.getByRole("button", { name: "Thème" }).click();
            await page.reload();

            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });
    });

    // TODO Fix mobile tests
    test.describe.skip("Mobile only", (): void => {
        test.skip(({ isMobile }): boolean => !isMobile);

        test("should not have a theme button directly", async ({ page }): Promise<void> => {
            const themeButton: Locator = page.getByRole("button", { name: "Thème" });
            await expect(themeButton).toHaveCount(0);
        });

        test("should have a theme selector in the menu", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Menu" }).click();

            const themeSelector: Locator = page.getByRole("button", { name: "Automatique" });
            await expect(themeSelector).toHaveCount(1);
        });

        test("should update theme", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Menu" }).click();

            await page.getByRole("button", { name: "Automatique" }).click();
            await page.getByRole("option", { name: "Clair" }).click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "light");

            await page.getByRole("button", { name: "Clair" }).click();
            await page.getByRole("option", { name: "Sombre" }).click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });

        test("should retain theme", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Menu" }).click();
            await page.getByRole("button", { name: "Automatique" }).click();
            await page.getByRole("option", { name: "Sombre" }).click();
            await page.reload();

            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });
    });
});