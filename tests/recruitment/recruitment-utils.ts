import { expect, Page } from "@playwright/test";
import dataCandidates from "./mock-candidates.json";
import dataVacancies from "./mock-vacancies.json";

type CandidateScenario = keyof typeof dataCandidates;
type VacancieScenario = keyof typeof dataVacancies;

interface CandidateData {
    firstName: string;
    lastName: string;
    jobTitle: string;
    email: string;
}

interface VacancieData {
    name: string;
    jobTitle: string;
    managerPrefix: string;
    description: string;
}

abstract class RecruitmentPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.getByRole('link', { name: 'Recruitment' }).click();
    }

    public async save() {
        await this.page.getByRole('button', { name: 'Save' }).click();
    }

    abstract enterNewForm(): Promise<void>;
    abstract findData(scenario: string): Promise<any>;
    abstract fillForm(data: any): Promise<void>;
    abstract assertSuccessMessage(...args: any[]): Promise<void>;
}

export class CandidatesPage extends RecruitmentPage {
    public async enterNewForm() {
        await this.page.getByRole('button', { name: ' Add' }).click();
        await this.page.waitForURL('**/recruitment/addCandidate*');
    }

    public async findData(candidateScenario: string): Promise<CandidateData> {
        return dataCandidates[candidateScenario as CandidateScenario];
    }

    public async fillForm(candidateScenario: CandidateData) {
        const dataCandidate = candidateScenario;
        await this.page.getByRole('textbox', { name: 'First Name' }).click();
        await this.page.getByRole('textbox', { name: 'First Name' }).fill(dataCandidate.firstName);
        await this.page.getByRole('textbox', { name: 'Last Name' }).click();
        await this.page.getByRole('textbox', { name: 'Last Name' }).fill(dataCandidate.lastName);
        await this.page.locator('div').filter({ hasText: /^-- Select --$/ }).nth(2).click();
        await this.page.getByRole('option', { name: dataCandidate.jobTitle }).click();
        await this.page.getByRole('textbox', { name: 'Type here' }).first().click();
        await this.page.getByRole('textbox', { name: 'Type here' }).first().fill(dataCandidate.email);
    }

    public async assertSuccessMessage(candidateData: CandidateData) {
        await expect(this.page.getByRole('heading', { name: 'Application Stage' })).toBeVisible({ timeout: 10000 });
        await this.page.getByText(`Name${candidateData.firstName} ${candidateData.lastName}`).click();
        await this.page.getByText(`Vacancy${candidateData.jobTitle}`, { exact: true }).click();
    }
}

export class VacanciesPage extends RecruitmentPage {
    readonly vacancyNameInput = this.page.getByRole('textbox').nth(1);
    readonly jobTitleSelect = this.page.locator('.oxd-select-wrapper').first();
    readonly hiringManagerInput = this.page.getByPlaceholder('Type for hints...');
    readonly suggestionsList = this.page.locator('.oxd-select-dropdown').first();
    public selectedManagerName: string = '';

    public async enterNewForm() {
        await this.page.getByRole('listitem').filter({ hasText: 'Vacancies' }).click();
        await this.page.getByRole('button', { name: ' Add' }).click();
        this.page.waitForURL('**/recruitment/addJobVacancy*');
    }

    public async findData(vacancieScenario: string): Promise<any> {
        return dataVacancies[vacancieScenario as VacancieScenario];
    }

    public async fillForm(data: VacancieData) {
        await this.vacancyNameInput.fill(data.name);

        await this.jobTitleSelect.click();
        await this.page.getByRole('option', { name: data.jobTitle }).click();

        await this.hiringManagerInput.fill(data.managerPrefix);
        
        const firstOption = this.suggestionsList.first();
        await firstOption.waitFor({ state: 'visible' });

        this.selectedManagerName = (await firstOption.innerText()).trim();

        if (data.description) {
            await this.page.getByPlaceholder('Type description here').fill(data.description);
        }
    }

    public async assertSuccessMessage(vacancieData: VacancieData) {
        await this.page.getByRole('listitem').filter({ hasText: 'Vacancies' }).click();
        
        await this.page.locator('div:nth-child(3) > .oxd-input-group > div:nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        
        await this.page.getByRole('option', { name: this.selectedManagerName }).click();
        
        await this.page.getByRole('button', { name: 'Search' }).click();
        
        const row = this.page.getByRole('row', { name: vacancieData.name });
        await expect(row).toBeVisible();
        await expect(row).toContainText(this.selectedManagerName);
    }
}
