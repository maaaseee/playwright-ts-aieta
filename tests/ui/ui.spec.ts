import { expect, test } from '@playwright/test';
import { performLogin } from '../auth/login-utils';

interface MenuItem {
    name: string;
    position: number;
}

const menuItems: MenuItem[] = [
    { name: 'Admin', position: 1 },
    { name: 'PIM', position: 2 },
    { name: 'Leave', position: 3 },
    { name: 'Time', position: 4 },
    { name: 'Recruitment', position: 5 },
    { name: 'My Info', position: 6 },
    { name: 'Performance', position: 7 },
    { name: 'Dashboard', position: 8 }
] 

test.describe('Feature: Gestión de UI', () => {

    test.beforeEach(async ({ page }) => {
        await performLogin(page);
    });

    test('Validar botones del menú lateral @visual', async ({ page }) => {
        await expect(page.getByText('AdminPIMLeaveTimeRecruitmentMy')).toBeVisible({ timeout: 10000 });

        let correctMenuItemPosition = true;

        for (let index = 0; index < menuItems.length; index++) {
            const element = menuItems[index];
            await expect(page.getByRole('link', { name: element.name })).toBeVisible();
            
            if (element.position != (index + 1)) {
                correctMenuItemPosition = false;
            }
        }

        await expect(correctMenuItemPosition).toBe(true);
    });

    test('Validar búsqueda de elementos en menú lateral @visual', async ({ page }) => {
        await expect(page.getByText('AdminPIMLeaveTimeRecruitmentMy')).toBeVisible({ timeout: 10000 });

        const searchInput = page.getByRole('searchbox', { name: 'Search' });
        await expect(searchInput).toBeVisible();
        await searchInput.click();
        await searchInput.fill('D');
        const foundItems = menuItems.filter(item => item.name.includes('D'));

        for (let index = 0; index < foundItems.length; index++) {
            const element = foundItems[index];
            await expect(page.getByRole('link', { name: element.name })).toBeVisible();
        }
    });
});