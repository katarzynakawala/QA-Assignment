import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly peopleRadio: Locator;
  readonly planetsRadio: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly loadingIndicator: Locator;
  readonly notFoundMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.peopleRadio = page.getByRole('radio', { name: 'People' });
    this.planetsRadio = page.getByRole('radio', { name: 'Planets' });
    this.searchInput = page.getByRole('searchbox'); // type="search" creates searchbox role
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.loadingIndicator = page.getByText('Loading...');
    this.notFoundMessage = page.getByText('Not found.');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('TntAssignment');
  }

  async search(searchType: 'people' | 'planets', query: string) {
    const radioButton = searchType === 'people' ? this.peopleRadio : this.planetsRadio;
    
    // Checking elements are ready before interaction
    await expect(radioButton).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchButton).toBeEnabled();
    
    await radioButton.check();
    await this.searchInput.fill(query);
    await this.searchButton.click();
    
    // Wait for navigation to complete
    await this.page.waitForLoadState('networkidle');
  }

  // Convenience methods for backward compatibility and readability
  async searchForPeople(query: string) {
    await this.search('people', query);
  }

  async searchForPlanets(query: string) {
    await this.search('planets', query);
  }

  async verifySearchResults(searchType: 'people' | 'planets', query: string, expectedText?: string) {
    // Check urls
    await expect(this.page).toHaveURL(new RegExp(`searchType=${searchType}`));
    await expect(this.page).toHaveURL(new RegExp(`query=${query}`));

    // Ensure loading is complete
    await expect(this.loadingIndicator).not.toBeVisible();
    await expect(this.notFoundMessage).not.toBeVisible();

    // Verify results are displayed
    if (expectedText) {
      await expect(this.page.getByText(expectedText)).toBeVisible({ timeout: 10000 });
    }
  }

  // Convenience methods for backward compatibility and readability
  async verifyPeopleSearchResults(query: string, expectedText?: string) {
    await this.verifySearchResults('people', query, expectedText);
  }

  async verifyPlanetsSearchResults(query: string, expectedText?: string) {
    await this.verifySearchResults('planets', query, expectedText);
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle('TntAssignment');
    await expect(this.page.getByRole('heading', { name: 'The Star Wars Search' })).toBeVisible();
    
    // Ensure all interactive elements are ready
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeEditable();
    await expect(this.searchButton).toBeVisible();
    await expect(this.searchButton).toBeEnabled();
    await expect(this.peopleRadio).toBeVisible();
    await expect(this.peopleRadio).toBeEnabled();
    await expect(this.planetsRadio).toBeVisible();
    await expect(this.planetsRadio).toBeEnabled();
  }
}
