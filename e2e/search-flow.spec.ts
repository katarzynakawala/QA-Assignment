import { test, expect } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { testData } from './testData';

test.describe('Star Wars Search - Critical Use Cases', () => {
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    // Initialize SearchPage
    searchPage = new SearchPage(page);
    
    // Navigate to the application and verify it's loaded
    await searchPage.goto();
    await searchPage.verifyPageLoaded();
  });

  test.afterEach(async ({ page }) => {
    // Clean up browser state to ensure test isolation
    await page.evaluate(() => {
      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();
      
      // Clear any cached data
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => {
            caches.delete(name);
          });
        });
      }
    });
    
    // Clear cookies
    const cookies = await page.context().cookies();
    if (cookies.length > 0) {
      await page.context().clearCookies();
    }
    
    // Clear any browser cache
    await page.reload({ waitUntil: 'networkidle' });
  });

  test('should display multiple people results', async () => {
    await searchPage.search('people', testData.partialMatching.people.query);
    
    // Verify URL contains our search parameters
    await expect(searchPage.page).toHaveURL(/searchType=people/);
    await expect(searchPage.page).toHaveURL(/query=lu/);
    
    // Verify multiple results are displayed (Luke Skywalker and Luminara Unduli)
    const characterComponents = searchPage.page.locator('app-character');
    await expect(characterComponents.first()).toBeVisible({ timeout: 10000 });
    
    // Should have multiple characters (at least 2)
    const count = await characterComponents.count();
    expect(count).toBeGreaterThanOrEqual(2);
    
    // Verify both expected characters are in the results
    await expect(searchPage.page.getByText(testData.partialMatching.people.expectedMultiple[0])).toBeVisible();
    await expect(searchPage.page.getByText(testData.partialMatching.people.expectedMultiple[1])).toBeVisible();
    
    // Verify character details are displayed for first character
    const firstCharacter = characterComponents.first();
    await expect(firstCharacter).toBeVisible();
    await expect(firstCharacter.getByText(/Gender:/)).toBeVisible();
    await expect(firstCharacter.getByText(/Birth year:/)).toBeVisible();
  });

  test('should display multiple planet results', async () => {
    await searchPage.search('planets', testData.partialMatching.planets.query);
    
    // Verify URL contains our search parameters
    await expect(searchPage.page).toHaveURL(/searchType=planets/);
    await expect(searchPage.page).toHaveURL(/query=ala/);
    
    // Verify multiple results are displayed (should find planets containing 'ala')
    const planetComponents = searchPage.page.locator('app-planet');
    await expect(planetComponents.first()).toBeVisible({ timeout: 10000 });
    
    // Should have multiple planets (at least 3)
    const count = await planetComponents.count();
    expect(count).toBeGreaterThanOrEqual(3);
    
    // Verify expected planets are in the results
    await expect(searchPage.page.getByText(testData.partialMatching.planets.expectedMultiple[0])).toBeVisible();
    await expect(searchPage.page.getByText(testData.partialMatching.planets.expectedMultiple[1])).toBeVisible();
    await expect(searchPage.page.getByText(testData.partialMatching.planets.expectedMultiple[2])).toBeVisible();
    
    // Verify planet components display details
    const firstPlanet = planetComponents.first();
    await expect(firstPlanet.getByText(/Population:/)).toBeVisible();
    await expect(firstPlanet.getByText(/Climate:/)).toBeVisible();
  });

  test('should allow search using Enter key instead of clicking Search button', async () => {
    // Select people radio button and fill search input
    await searchPage.peopleRadio.check();
    await searchPage.searchInput.fill(testData.singleResult.people.query);
    
    // Press Enter instead of clicking Search button
    await searchPage.searchInput.press('Enter');
    
    // Wait for navigation and verify results
    await searchPage.page.waitForLoadState('networkidle');
    await expect(searchPage.page).toHaveURL(new RegExp(`query=${testData.singleResult.people.query}`));
    
    // Verify expected result is found
    await expect(searchPage.page.getByText(testData.singleResult.people.expectedResult)).toBeVisible();
  });
});
