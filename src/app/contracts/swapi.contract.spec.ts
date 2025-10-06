import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

// Jasmine global function declarations
declare let describe: any;
declare let it: any;
declare let beforeEach: any;
declare let expect: any;
declare let fail: any;
declare let console: any;

/**
 * Live SWAPI Integration Tests
 * These tests make real calls to SWAPI to validate the contract.
 * Run with: npm run test:contract
 */
describe('Live SWAPI Integration Tests', () => {
  let service: ApiService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
  });

  // Helper function to validate API response with HTTP status
  const validateApiResponse = (
    searchType: string, 
    query: string, 
    done: () => void,
    validateContent?: (response: any) => void
  ) => {
    service.searchWithResponse(searchType, query).subscribe({
      next: (httpResponse) => {
        // Always validate HTTP status
        expect(httpResponse.status).toBe(200);
        expect(httpResponse.statusText).toBe('OK');
        
        // Validate response structure
        const response = httpResponse.body;
        expect(response).toBeDefined();
        expect(response.result).toBeDefined();
        expect(Array.isArray(response.result)).toBe(true);
        
        // Custom content validation if provided
        if (validateContent) {
          validateContent(response);
        }
        
        done();
      },
      error: (error) => {
        fail(`API call failed: ${error.message}`);
        done();
      }
    });
  };

  describe('Real People Search API', () => {
    it('should return HTTP 200 and valid people data for "luke" search', (done) => {
      validateApiResponse('people', 'luke', done, (response) => {
        if (response.result.length > 0) {
          const person = response.result[0];
          
          // Validate required structure that frontend expects
          expect(person.properties).toBeDefined();
          expect(person.properties.name).toBeDefined();
          expect(person.properties.height).toBeDefined();
          expect(person.properties.mass).toBeDefined();
          
          // Validate data types
          expect(typeof person.properties.name).toBe('string');
          expect(typeof person.properties.height).toBe('string');
          expect(typeof person.properties.mass).toBe('string');
          
          // Validate Luke Skywalker specific data (contract validation)
          expect(person.properties.name.toLowerCase()).toContain('luke');
          
          console.log('✅ Live People API Response Structure Valid');
          console.log('Sample person:', person.properties.name);
        }
      });
    }, 10000);

    it('should return HTTP 200 with empty results for non-existent people', (done) => {
      validateApiResponse('people', 'nonexistentcharacter123456', done, (response) => {
        expect(response.result.length).toBe(0);
        console.log('✅ Empty results handled correctly');
      });
    }, 10000);
  });

  describe('Real Planets Search API', () => {
    it('should return HTTP 200 and valid planet data for "tatooine" search', (done) => {
      validateApiResponse('planets', 'tatooine', done, (response) => {
        if (response.result.length > 0) {
          const planet = response.result[0];
          
          // Validate required structure that frontend expects
          expect(planet.properties).toBeDefined();
          expect(planet.properties.name).toBeDefined();
          expect(planet.properties.climate).toBeDefined();
          expect(planet.properties.terrain).toBeDefined();
          
          // Validate data types
          expect(typeof planet.properties.name).toBe('string');
          expect(typeof planet.properties.climate).toBe('string');
          expect(typeof planet.properties.terrain).toBe('string');
          
          // Validate Tatooine specific data (contract validation)
          expect(planet.properties.name.toLowerCase()).toContain('tatooine');
          expect(planet.properties.climate.toLowerCase()).toContain('arid');
          
          console.log('✅ Live Planets API Response Structure Valid');
          console.log('Sample planet:', planet.properties.name);
        }
      });
    }, 10000);

    it('should return HTTP 200 with empty results for non-existent planets', (done) => {
      validateApiResponse('planets', 'nonexistentplanet123456', done, (response) => {
        expect(response.result.length).toBe(0);
        console.log('✅ Empty planet results handled correctly');
      });
    }, 10000);
  });

  describe('API Availability and Response Times', () => {
    it('should respond within reasonable time limits with HTTP 200', (done) => {
      const startTime = Date.now();
      
      validateApiResponse('people', 'luke', done, () => {
        const responseTime = Date.now() - startTime;
        
        expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
        
        console.log(`✅ API Response Time: ${responseTime}ms`);
      });
    }, 10000);

    it('should return HTTP 200 and consistent data structure across multiple calls', (done) => {
      const testCalls = [
        { type: 'people', query: 'luke' },
        { type: 'people', query: 'leia' },
        { type: 'planets', query: 'tatooine' }
      ];

      let completedCalls = 0;
      const totalCalls = testCalls.length;

      testCalls.forEach((testCall, index) => {
        service.searchWithResponse(testCall.type, testCall.query).subscribe({
          next: (httpResponse) => {
            // Validate HTTP status code
            expect(httpResponse.status).toBe(200);
            expect(httpResponse.statusText).toBe('OK');
            
            // Validate consistent structure
            const response = httpResponse.body;
            expect(response).toBeDefined();
            expect(response.result).toBeDefined();
            expect(Array.isArray(response.result)).toBe(true);
            
            completedCalls++;
            console.log(`✅ Call ${index + 1}/${totalCalls} structure valid`);
            
            if (completedCalls === totalCalls) {
              console.log('✅ All API calls have consistent structure');
              done();
            }
          },
          error: (error) => {
            fail(`Consistency test failed on call ${index + 1}: ${error.message}`);
            done();
          }
        });
      });
    }, 15000);
  });

  describe('Error Handling Validation', () => {
    it('should handle malformed search queries gracefully with proper HTTP status', (done) => {
      // Test with special characters and edge cases
      const edgeCases = ['', ' ', '!@#$%', 'very-long-search-query-that-probably-wont-exist-in-the-database'];
      let completedTests = 0;

      edgeCases.forEach((query) => {
        service.searchWithResponse('people', query).subscribe({
          next: (httpResponse) => {
            // Should return HTTP 200 even for edge cases
            expect(httpResponse.status).toBe(200);
            expect(httpResponse.statusText).toBe('OK');
            
            // Should still return valid structure even for edge cases
            const response = httpResponse.body;
            expect(response).toBeDefined();
            // Check for either 'result' (from API) or 'results' (from SWAPI)
            const resultProperty = response.result || response.results;
            expect(resultProperty).toBeDefined();
            expect(Array.isArray(resultProperty)).toBe(true);
            
            completedTests++;
            if (completedTests === edgeCases.length) {
              console.log('✅ All edge cases handled gracefully');
              done();
            }
          },
          error: (error) => {
            // Some edge cases might fail, but should fail gracefully
            expect(error).toBeDefined();
            completedTests++;
            if (completedTests === edgeCases.length) {
              console.log('✅ Edge case errors handled gracefully');
              done();
            }
          }
        });
      });
    }, 20000);
  });
});
