import { expect, test } from '@playwright/test';
import { performLogin } from '../auth/login-utils';
import { SideMenuUtils } from './side-menu-utils';
import { AuthPageUtils } from './auth-page-utils';
import * as allure from "allure-js-commons";

test.describe("Feature: Auth page", () => {
    let authPageUtils: AuthPageUtils;

    test.beforeEach(async ({ page }) => {
        await allure.severity("normal");
        authPageUtils = new AuthPageUtils(page);
        await authPageUtils.navigateToLogin();
    });

    test('Validar color de página de login @visual', async ({ page }) => {
        await authPageUtils.validateLayoutColor();
    });
});

test.describe('Feature: Sidebar de Home Dashboard', () => {
    let sideMenuUtils: SideMenuUtils;

    test.beforeEach(async ({ page }) => {
        await performLogin(page);
        sideMenuUtils = new SideMenuUtils(page)
        await expect(page.getByText('AdminPIMLeaveTimeRecruitmentMy')).toBeVisible({ timeout: 10000 });
    });

    test('Validar orden de botones del menú lateral @visual', async ({ page }) => {
        await allure.severity("trivial");
        const menuItems = sideMenuUtils.getMenuItems();
        await sideMenuUtils.validateMenuItems(menuItems);
    });

    test('Validar busqueda de elementos con letra "D" en menú lateral @visual', async ({ page }) => {
        await allure.severity("minor");
        await sideMenuUtils.search('D');
        const menuItems = sideMenuUtils.getMenuItems();
        await sideMenuUtils.validateSearch('D', menuItems);
    });

    test('Validar busqueda de elementos con letra "A" en menú lateral @visual', async ({ page }) => {
        await allure.severity("minor");
        await sideMenuUtils.search('A');
        const menuItems = sideMenuUtils.getMenuItems();
        await sideMenuUtils.validateSearch('A', menuItems);
    });
});