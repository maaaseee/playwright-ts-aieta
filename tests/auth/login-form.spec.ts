import { test } from '@playwright/test';
import { LoginPage } from './login-utils';
import * as allure from "allure-js-commons";

test('Login Form Success with Valid Credentials', async ({ page }) => {
  await allure.severity("blocker");
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('validCredentials');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectValidCredentialsHeader();
});

test('Login Form Failure with Invalid Credentials', async ({ page }) => {
  await allure.severity("blocker");
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('invalidCredentials');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectInvalidCredentialsAlert();
});

test('Login Form Failure with SQL Injection', async ({ page }) => {
  await allure.severity("critical");
  const loginPage = new LoginPage(page);
  const dataUser = loginPage.getUserData('sqlInjection');
  await loginPage.goto();
  await loginPage.login(dataUser.user, dataUser.pass);
  await loginPage.expectInvalidCredentialsAlert();
});