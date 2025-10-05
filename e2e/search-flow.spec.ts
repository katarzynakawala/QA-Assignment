import { test } from '@playwright/test';
import { SearchPage } from './pages/SearchPage';
import { testData } from './testData';

test.describe('Star Wars Search - Critical User Journeys', () => {
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

  test('should successfully search for people and display results', async () => {
    await searchPage.search('people', testData.people.query);
    await searchPage.verifySearchResults('people', testData.people.query, testData.people.expectedResult);
  });

  test('should successfully search for planets and display results', async () => {
    await searchPage.search('planets', testData.planets.query);
    await searchPage.verifySearchResults('planets', testData.planets.query, testData.planets.expectedResult);
  });
});
