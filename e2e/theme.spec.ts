import { expect, type Locator, test } from "@playwright/test";

test.describe.skip("Theme", (): void => {
    test.beforeEach(async ({ page }): Promise<void> => {
        await page.goto("/");
        await page.getByRole("button", { name: "Accepter" }).click();
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

    test.describe("Mobile only", (): void => {
        test.skip(({ isMobile }): boolean => !isMobile);

        // TODO: Fix this test
        test.skip("should update theme", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Menu" }).click();

            await page.getByLabel("Thème").click();
            await page.getByText("Clair").click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "light");

            // This doesn't seem to work after the first click.
            await page.getByLabel("Thème").click();
            await page.getByText("Sombre").click();
            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });

        test("should retain theme", async ({ page }): Promise<void> => {
            await page.getByRole("button", { name: "Menu" }).click();
            await page.getByLabel("Thème").click();
            await page.getByRole("option", { name: "Sombre" }).click();
            await page.reload();

            await expect(page.locator("html")).toHaveAttribute("data-mui-color-scheme", "dark");
        });
    });
});
