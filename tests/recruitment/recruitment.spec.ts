import { test } from '@playwright/test';
import { performLogin } from '../auth/login-utils';
import { CandidatesPage, VacanciesPage } from './recruitment-utils';

test.describe('Feature: Gestión de Recruitment', () => {

  test.beforeEach(async ({ page }) => {
    await performLogin(page);
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
