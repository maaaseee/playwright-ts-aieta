import { test, expect } from '@playwright/test';
import { LoginPage } from './login-utils';
import data from './mock-users.json';
  
test('Login Form Success with Valid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = data.find((entry) => entry.scenario === 'Valid Credentials')?.data;
  if (!dataUser) {
    throw new Error('Valid credentials not found');
  }
  await loginPage.goto();
  await loginPage.login(dataUser?.user, dataUser?.pass);
  await loginPage.expectValidCredentialsHeader();
});

test('Login Form Failure with Invalid Credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = data.find((entry) => entry.scenario === 'Invalid Credentials')?.data;
  if (!dataUser) {
    throw new Error('Invalid credentials not found');
  }
  await loginPage.goto();
  await loginPage.login(dataUser?.user, dataUser?.pass);
  await loginPage.expectInvalidCredentialsAlert();
});

test('Login Form Failure with SQL Injection', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dataUser = data.find((entry) => entry.scenario === 'SQL Injection')?.data;
  if (!dataUser) {
    throw new Error('SQL injection test data not found');
  }
  await loginPage.goto();
  await loginPage.login(dataUser?.user, dataUser?.pass);
  await loginPage.expectInvalidCredentialsAlert();
});