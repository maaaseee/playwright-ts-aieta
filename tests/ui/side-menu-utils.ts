import { Page, Locator, expect } from '@playwright/test';
import menuData from './ui-data.json';

export interface MenuItem {
    name: string;
    position: number;
}

export class SideMenuUtils {
    readonly page: Page;
    readonly menuContainer: Locator;
    readonly searchInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.menuContainer = page.getByText('AdminPIMLeaveTimeRecruitmentMy');
        this.searchInput = page.getByRole('textbox', { name: 'Search' });
    }

    async waitForMenuVisible() {
        await expect(this.menuContainer).toBeVisible({ timeout: 10000 });
    }

    getMenuItems(): MenuItem[] {
        return menuData;
    }

    getMenuItemLocator(name: string): Locator {
        return this.page.getByRole('link', { name });
    }

    async search(text: string) {
        await expect(this.searchInput).toBeVisible();
        await this.searchInput.click();
        await this.searchInput.fill(text);
    }

    async validateMenuItems(items: MenuItem[]) {
        let correctMenuItemPosition = true;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            await expect(this.getMenuItemLocator(element.name)).toBeVisible();
            if (element.position !== (index + 1)) {
                correctMenuItemPosition = false;
            }
        }
        expect(correctMenuItemPosition).toBe(true);
    }

    async validateSearch(text: string, allItems: MenuItem[]) {
        const foundItems = allItems.filter(item => item.name.includes(text));
        for (const item of foundItems) {
            await expect(this.getMenuItemLocator(item.name)).toBeVisible();
        }
    }
}