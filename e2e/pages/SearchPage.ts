import { Page, Locator, expect } from '@playwright/test';

export class SearchPage {
  readonly page: Page;
  readonly searchButton: Locator;
  readonly peopleRadio: Locator;
  readonly planetsRadio: Locator;
  readonly searchInput: Locator;
  readonly loadingIndicator: Locator;
  readonly notFoundMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.peopleRadio = page.getByRole('radio', { name: 'People' });
    this.planetsRadio = page.getByRole('radio', { name: 'Planets' });
    this.searchInput = page.getByRole('searchbox'); 
    this.loadingIndicator = page.getByText('Loading...');
    this.notFoundMessage = page.getByText('Not found.');
  }

  async goto() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle('TntAssignment');
  }

  async search(searchType: 'people' | 'planets', query: string) {
    // Select appropriate radio button
    const radioButton = searchType === 'people' ? 
      this.peopleRadio : 
      this.planetsRadio;
    
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

  async verifySearchResults(searchType: 'people' | 'planets', query: string, expectedText: string) {
    // Check URLs
    await expect(this.page).toHaveURL(new RegExp(`searchType=${searchType}`));
    await expect(this.page).toHaveURL(new RegExp(`query=${query}`));

    // Ensure loading is complete
    await expect(this.loadingIndicator).not.toBeVisible();
    await expect(this.notFoundMessage).not.toBeVisible();

    // Verify single result is displayed
    await expect(this.page.getByText(expectedText)).toBeVisible({ timeout: 10000 });
  }

  async verifyMultipleSearchResults(searchType: 'people' | 'planets', query: string, expectedTexts: string[]) {
    // Check URLs
    await expect(this.page).toHaveURL(new RegExp(`searchType=${searchType}`));
    await expect(this.page).toHaveURL(new RegExp(`query=${query}`));

    // Ensure loading is complete
    await expect(this.loadingIndicator).not.toBeVisible();
    await expect(this.notFoundMessage).not.toBeVisible();

    // Verify multiple results are displayed
    const componentSelector = searchType === 'people' ? 'app-character' : 'app-planet';
    const resultComponents = this.page.locator(componentSelector);
    
    // Should have at least the number of results we expect
    await expect(resultComponents.first()).toBeVisible({ timeout: 10000 });
    const actualCount = await resultComponents.count();
    const expectedCount = expectedTexts.length;
    expect(actualCount).toBeGreaterThanOrEqual(expectedCount);
    
    // Verify each expected text is present
    for (const expectedText of expectedTexts) {
      await expect(this.page.getByText(expectedText, { exact: false })).toBeVisible({ timeout: 5000 });
    }
  }

  async verifyPageLoaded() {
    await expect(this.page).toHaveTitle('TntAssignment');
    await expect(this.page.getByRole('heading', { name: 'The Star Wars Search' })).toBeVisible();
    
    // Ensure all interactive elements are ready
    await expect(this.searchInput).toBeVisible();
    await expect(this.searchInput).toBeEditable();
    await expect(this.searchButton).toBeVisible();
    await expect(this.searchButton).toBeEnabled();
    
    // Check radio buttons
    await expect(this.peopleRadio).toBeVisible();
    await expect(this.peopleRadio).toBeEnabled();
    await expect(this.planetsRadio).toBeVisible();
    await expect(this.planetsRadio).toBeEnabled();
  }
}
