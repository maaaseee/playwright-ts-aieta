import { test } from '@playwright/test';
import { LoginPage } from './login-utils';
  
test('Login Form Success with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('validCredentials');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectValidCredentialsHeader();
});

test('Login Form Failure with Invalid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('invalidCredentials');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectInvalidCredentialsAlert();
});

test('Login Form Failure with SQL Injection', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('sqlInjection');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectInvalidCredentialsAlert();
});