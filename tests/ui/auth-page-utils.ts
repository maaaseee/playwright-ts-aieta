import { expect, Locator, Page } from "@playwright/test";

export class AuthPageUtils {
    readonly page: Page;
    readonly loginLayout: Locator;
    static readonly BACKGROUND_COLOR = 'rgb(255, 123, 29)'; // #FF7B1D in RGB

    constructor(page: Page) {
        this.page = page;
        this.loginLayout = page.locator('.orangehrm-login-layout');
    }

    async navigateToLogin() {
        await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    async validateLayoutColor() {
        await expect(this.loginLayout).toHaveCSS('background-color', AuthPageUtils.BACKGROUND_COLOR);
    }
}
