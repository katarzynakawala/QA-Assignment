import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';

describe('Star Wars Character Card Component', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  
  // Mock character data
  const mockCharacterApiResponse = {
    name: 'Luke Skywalker',
    gender: 'male',
    birth_year: '19BBY',
    eye_color: 'blue',
    skin_color: 'fair',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    url: 'https://swapi.dev/api/people/1/'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    
    // Set the mock character data (simulating API response)
    component.character = mockCharacterApiResponse;
    fixture.detectChanges();
  });

  it('should create character component successfully', () => {
    expect(component).toBeTruthy();
  });

  it('should display character name in card subtitle', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Luke Skywalker');

    const nameElement = compiled.querySelector('.card-subtitle');
    expect(nameElement.textContent.trim()).toBe('Luke Skywalker');
  });

  it('should display character gender information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('male');
    
    const rows = compiled.querySelectorAll('.row');
    const genderRow = Array.from(rows).find((row: any) => 
      row.textContent?.includes('Gender:')
    ) as any;
    expect(genderRow?.textContent).toContain('male');
  });

  it('should display character birth year information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('19BBY');
    
    const rows = compiled.querySelectorAll('.row');
    const birthYearRow = Array.from(rows).find((row: any) => 
      row.textContent?.includes('Birth year:')
    ) as any;
    expect(birthYearRow?.textContent).toContain('19BBY');
  });

  it('should display character eye color information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('blue');
    
    const rows = compiled.querySelectorAll('.row');
    const eyeColorRow = Array.from(rows).find((row: any) => 
      row.textContent?.includes('Eye color:')
    ) as any;
    expect(eyeColorRow?.textContent).toContain('blue');
  });

  it('should display character skin color information correctly', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('fair');
    
    const rows = compiled.querySelectorAll('.row');
    const skinColorRow = Array.from(rows).find((row: any) => 
      row.textContent?.includes('Skin color:')
    ) as any;
    expect(skinColorRow?.textContent).toContain('fair');
  });

  it('should handle different character data and update display correctly', () => {
    const differentCharacter = {
      name: 'Princess Leia',
      gender: 'female',
      birth_year: '19BBY',
      eye_color: 'brown',
      skin_color: 'light'
    };

    component.character = differentCharacter;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.querySelector('.card-subtitle').textContent.trim()).toBe('Princess Leia');
    expect(compiled.textContent).toContain('female');
    expect(compiled.textContent).toContain('brown');
    expect(compiled.textContent).toContain('light');
  });

  // Unknown values test
  it('should display unknown values correctly', () => {
    const characterWithUnknowns = {
      name: 'R2-D2',
      gender: 'n/a',
      birth_year: '33BBY',
      eye_color: 'red',
      skin_color: 'white, blue'
    };

    component.character = characterWithUnknowns;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('R2-D2');
    expect(compiled.textContent).toContain('n/a');
    expect(compiled.textContent).toContain('red');
    expect(compiled.textContent).toContain('white, blue');
  });

  // Negative not found scenarios
  it('should handle missing character data gracefully', () => {
    component.character = null;
    
    expect(component).toBeTruthy();
    expect(component.character).toBeNull();
    expect(() => fixture.detectChanges()).toThrow();
  });

  // Empty string character properties
  it('should handle empty string character properties', () => {
    const characterWithEmptyValues = {
      name: 'Empty Properties Character',
      gender: '',
      birth_year: '',
      eye_color: '',
      skin_color: ''
    };

    component.character = characterWithEmptyValues;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    
    expect(compiled.textContent).toContain('Empty Properties Character');
    expect(component).toBeTruthy();
  });
});
