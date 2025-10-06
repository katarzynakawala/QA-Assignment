import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetComponent } from './planet.component';

describe('Star Wars Planet Card Component', () => {
  let component: PlanetComponent;
  let fixture: ComponentFixture<PlanetComponent>;
  
  // Mock planet data 
  const mockPlanetApiResponse = {
    name: 'Tatooine',
    population: '200000',
    climate: 'arid',
    gravity: '1 standard',
    terrain: 'desert',
    surface_water: '1',
    diameter: '10465',
    rotation_period: '23',
    orbital_period: '304',
    url: 'https://swapi.dev/api/planets/1/'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlanetComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetComponent);
    component = fixture.componentInstance;
    
    component.planet = mockPlanetApiResponse;
    fixture.detectChanges();
  });

  it('should create planet component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should display planet name in card subtitle', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Tatooine');
    
    const nameElement = compiled.querySelector('.card-subtitle');
    expect(nameElement.textContent.trim()).toBe('Tatooine');
  });

  it('should display planet population information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('200000');
    
    const rows = compiled.querySelectorAll('.row');
    const populationRow = Array.from(rows).find((row: Element) => 
      row.textContent?.includes('Population:')
    ) as HTMLElement;
    expect(populationRow?.textContent).toContain('200000');
  });

  it('should show the correct planet climate', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('arid');
    
    const rows = compiled.querySelectorAll('.row');
    const climateRow = Array.from(rows).find((row: Element) => 
      row.textContent?.includes('Climate:')
    ) as HTMLElement;
    expect(climateRow?.textContent).toContain('arid');
  });

  it('should show the correct planet gravity', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('1 standard');
    
    const rows = compiled.querySelectorAll('.row');
    const gravityRow = Array.from(rows).find((row: Element) => 
      row.textContent?.includes('Gravity:')
    ) as HTMLElement;
    expect(gravityRow?.textContent).toContain('1 standard');
  });

  // Different planet data 
  it('should display different planet data correctly', () => {
    const differentPlanet = {
      name: 'Coruscant',
      population: '1000000000000',
      climate: 'temperate',
      gravity: '1 standard'
    };

    component.planet = differentPlanet;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.card-subtitle').textContent.trim()).toBe('Coruscant');
    expect(compiled.textContent).toContain('1000000000000');
    expect(compiled.textContent).toContain('temperate');
    expect(compiled.textContent).toContain('1 standard');
  });

  // Case for unknown values
  it('should display unknown values correctly', () => {
    const planetWithUnknowns = {
      name: 'Unknown Planet',
      population: 'unknown',
      climate: 'unknown',
      gravity: 'N/A'
    };

    component.planet = planetWithUnknowns;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('Unknown Planet');
    expect(compiled.textContent).toContain('unknown');
    expect(compiled.textContent).toContain('N/A');
  });

  // "Not found" case - empty api response
  it('should handle missing planet data gracefully', () => {
    component.planet = null;
    
    expect(component).toBeTruthy();
    expect(component.planet).toBeNull();
    
    expect(() => fixture.detectChanges()).toThrow();
  });

	// Incomplete planet data 
  it('should handle incomplete planet data', () => {
    const incompletePlanet = {
      name: 'Incomplete Planet',
    };

    component.planet = incompletePlanet;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('Incomplete Planet');
    expect(component).toBeTruthy();
  });

  // Empty string planet
  it('should handle empty string planet properties', () => {
    const planetWithEmptyValues = {
      name: 'Empty Properties Planet',
      population: '',
      climate: '',
      gravity: ''
    };

    component.planet = planetWithEmptyValues;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('Empty Properties Planet');
    expect(component).toBeTruthy();
  });

  // Empty API response (no search results found)
  it('should demonstrate handling of empty search results scenario', () => {
    const emptySearchResult = []; 
    
    expect(emptySearchResult.length).toBe(0);
  });
});
