import { expect, test } from '@playwright/test';
import { LoginPage } from '../auth/login-utils';
import { CandidatesPage, VacanciesPage } from './recruitment-utils';

test.describe('Feature: Gestión de Recruitment', () => {

  test.beforeEach(async ({ page }) => {
    await test.step('Given el usuario inicia sesión con credenciales válidas', async () => {
      const loginPage = new LoginPage(page);
      const dataUser = loginPage.getUserData('validCredentials');
      await loginPage.goto();
      await loginPage.login(dataUser.user, dataUser.pass);
      await loginPage.expectValidCredentialsHeader();
    });
  });

  test('Cargar Candidate con datos válidos @critico', async ({ page }) => {
    const candidatesPage = new CandidatesPage(page);
    await candidatesPage.goto();

    await candidatesPage.enterNewForm();
    const dataCandidate = await candidatesPage.findData('validCandidate');
    await candidatesPage.fillForm(dataCandidate);
    await candidatesPage.save();

    await candidatesPage.assertSuccessMessage(dataCandidate);
  });

  test('Cargar Vacancy con datos válidos @critico', async ({ page }) => {
    const vacanciesPage = new VacanciesPage(page);
    await vacanciesPage.goto();

    await vacanciesPage.enterNewForm();
    const dataVacancie = await vacanciesPage.findData('validVacancy');
    await vacanciesPage.fillForm(dataVacancie);
    await vacanciesPage.save();

    await vacanciesPage.assertSuccessMessage(dataVacancie);
  })
});
