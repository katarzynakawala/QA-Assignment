import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../services/api.service';

/**
 * Live SWAPI Integration Tests
 * These tests make REAL calls to SWAPI to validate the contract.
 * Run with: npm run test:contract
 * 
 * Note: These tests require internet connection and depend on SWAPI availability.
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

  describe('Real People Search API', () => {
    it('should return valid people data for "luke" search', (done) => {
      service.search('people', 'luke').subscribe({
        next: (response) => {
          // Validate response structure
          expect(response).toBeDefined();
          expect(response.result).toBeDefined();
          expect(Array.isArray(response.result)).toBe(true);
          
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
          
          done();
        },
        error: (error) => {
          fail(`Live API call failed: ${error.message}`);
          done();
        }
      });
    }, 10000); // 10 second timeout for API call

    it('should handle empty results for non-existent people', (done) => {
      service.search('people', 'nonexistentcharacter123456').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          expect(response.result).toBeDefined();
          expect(Array.isArray(response.result)).toBe(true);
          expect(response.result.length).toBe(0);
          
          console.log('✅ Empty results handled correctly');
          done();
        },
        error: (error) => {
          fail(`Live API call failed: ${error.message}`);
          done();
        }
      });
    }, 10000);
  });

  describe('Real Planets Search API', () => {
    it('should return valid planet data for "tatooine" search', (done) => {
      service.search('planets', 'tatooine').subscribe({
        next: (response) => {
          // Validate response structure
          expect(response).toBeDefined();
          expect(response.result).toBeDefined();
          expect(Array.isArray(response.result)).toBe(true);
          
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
          
          done();
        },
        error: (error) => {
          fail(`Live API call failed: ${error.message}`);
          done();
        }
      });
    }, 10000);

    it('should handle empty results for non-existent planets', (done) => {
      service.search('planets', 'nonexistentplanet123456').subscribe({
        next: (response) => {
          expect(response).toBeDefined();
          expect(response.result).toBeDefined();
          expect(Array.isArray(response.result)).toBe(true);
          expect(response.result.length).toBe(0);
          
          console.log('✅ Empty planet results handled correctly');
          done();
        },
        error: (error) => {
          fail(`Live API call failed: ${error.message}`);
          done();
        }
      });
    }, 10000);
  });

  describe('API Availability and Response Times', () => {
    it('should respond within reasonable time limits', (done) => {
      const startTime = Date.now();
      
      service.search('people', 'luke').subscribe({
        next: (response) => {
          const responseTime = Date.now() - startTime;
          
          expect(responseTime).toBeLessThan(5000); // Should respond within 5 seconds
          expect(response).toBeDefined();
          
          console.log(`✅ API Response Time: ${responseTime}ms`);
          done();
        },
        error: (error) => {
          fail(`API performance test failed: ${error.message}`);
          done();
        }
      });
    }, 10000);

    it('should return consistent data structure across multiple calls', (done) => {
      const calls = [
        service.search('people', 'luke'),
        service.search('people', 'leia'),
        service.search('planets', 'tatooine')
      ];

      let completedCalls = 0;
      const totalCalls = calls.length;

      calls.forEach((call, index) => {
        call.subscribe({
          next: (response) => {
            // Validate consistent structure
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
    it('should handle malformed search queries gracefully', (done) => {
      // Test with special characters and edge cases
      const edgeCases = ['', ' ', '!@#$%', 'very-long-search-query-that-probably-wont-exist-in-the-database'];
      let completedTests = 0;

      edgeCases.forEach((query) => {
        service.search('people', query).subscribe({
          next: (response) => {
            // Should still return valid structure even for edge cases
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
