import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { CharacterComponent } from './components/character/character.component';
import { PlanetComponent } from './components/planet/planet.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let mockApiService: jasmine.SpyObj<ApiService>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    const apiServiceSpy = jasmine.createSpyObj('ApiService', ['search']);
    
    // Create a mock ActivatedRoute with queryParams observable
    mockActivatedRoute = {
      queryParams: of({})
    };

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CharacterComponent,
        PlanetComponent,
        SearchFormComponent
      ],
      providers: [
        { provide: ApiService, useValue: apiServiceSpy },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    mockApiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should create component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default undefined state', () => {
    expect(component.searchType).toBeUndefined();
    expect(component.searchResult).toBeUndefined();
    expect(component.isLoading).toBeUndefined();
  });

  describe('Component Initialization', () => {
    it('should perform people search when valid searchType and query parameters are provided', () => {
      const mockResponse = {
        result: [
          {
            properties: {
              name: 'Luke Skywalker',
              height: '172',
              mass: '77'
            }
          }
        ]
      };
      
      mockApiService.search.and.returnValue(of(mockResponse));
      mockActivatedRoute.queryParams = of({ 
        searchType: 'people', 
        query: 'luke' 
      });
      
      component.ngOnInit();
      
      expect(mockApiService.search).toHaveBeenCalledWith('people', 'luke');
      expect(component.searchType).toBe('people');
      expect(component.searchResult).toEqual(mockResponse.result);
      expect(component.isLoading).toBe(false);
    });

    it('should perform planets search and display results correctly', () => {
      const mockResponse = {
        result: [
          {
            properties: {
              name: 'Tatooine',
              climate: 'arid',
              terrain: 'desert'
            }
          }
        ]
      };
      
      mockApiService.search.and.returnValue(of(mockResponse));
      mockActivatedRoute.queryParams = of({ 
        searchType: 'planets', 
        query: 'tatooine' 
      });
      
      component.ngOnInit();
      
      expect(mockApiService.search).toHaveBeenCalledWith('planets', 'tatooine');
      expect(component.searchType).toBe('planets');
      expect(component.searchResult).toEqual(mockResponse.result);
    });

    it('should handle empty search results and set loading state to false', () => {
      const mockResponse = { result: [] };
      
      mockApiService.search.and.returnValue(of(mockResponse));
      mockActivatedRoute.queryParams = of({ 
        searchType: 'people', 
        query: 'nonexistent' 
      });
      
      component.ngOnInit();
      
      expect(component.searchResult).toEqual([]);
      expect(component.isLoading).toBe(false);
    });
  });

  describe('Not Found State Detection (isNotFound)', () => {
    it('should return true when search results are empty and not loading', () => {
      const result = component.isNotFound([], false);
      expect(result).toBe(true);
    });

    it('should return false when search results contain data', () => {
      const searchResult = [{ name: 'Luke' }];
      const result = component.isNotFound(searchResult, false);
      expect(result).toBe(false);
    });

    it('should return false when search is still in progress (loading state)', () => {
      const result = component.isNotFound([], true);
      expect(result).toBe(false);
    });

    it('should return false when search results are null (initial state)', () => {
      const result = component.isNotFound(null, false);
      expect(result).toBeFalsy(); // null is falsy
    });

    it('should return false when search results are undefined (initial state)', () => {
      const result = component.isNotFound(undefined, false);
      expect(result).toBeFalsy(); // undefined is falsy
    });

    it('should return false when both loading and has empty results', () => {
      const result = component.isNotFound([], true);
      expect(result).toBe(false);
    });
  });

  describe('template rendering', () => {
    it('should display loading message when isLoading is true', () => {
      component.isLoading = true;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Loading...');
    });

    it('should display "Not found" when isNotFound returns true', () => {
      component.searchResult = [];
      component.isLoading = false;
      fixture.detectChanges();
      
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('Not found.');
    });

    it('should display character components when searchType is people', () => {
      component.searchType = 'people';
      component.isLoading = false;
      component.searchResult = [
        { properties: { name: 'Luke Skywalker' } }
      ];
      fixture.detectChanges();
      
      const characterComponent = fixture.nativeElement.querySelector('app-character');
      expect(characterComponent).toBeTruthy();
    });

    it('should display planet components when searchType is planets', () => {
      component.searchType = 'planets';
      component.isLoading = false;
      component.searchResult = [
        { properties: { name: 'Tatooine' } }
      ];
      fixture.detectChanges();
      
      const planetComponent = fixture.nativeElement.querySelector('app-planet');
      expect(planetComponent).toBeTruthy();
    });

    it('should always display the search form', () => {
      fixture.detectChanges();
      
      const searchFormComponent = fixture.nativeElement.querySelector('app-search-form');
      expect(searchFormComponent).toBeTruthy();
    });
  });
});
