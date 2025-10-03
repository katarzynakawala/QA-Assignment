/// <reference types="jasmine" />
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SearchFormComponent } from './search-form.component';
import { of } from 'rxjs';

fdescribe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockActivatedRoute = {
      queryParams: of({})
    };

    await TestBed.configureTestingModule({
      declarations: [SearchFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    
    expect(component.searchForm.get('searchType')?.value).toBe('people');
    expect(component.searchForm.get('query')?.value).toBe('');
  });

  it('should require query field', () => {
    component.ngOnInit();
    const queryControl = component.searchForm.get('query');
    
    expect(queryControl?.invalid).toBeTruthy();
    
    queryControl?.setValue('test');
    expect(queryControl?.valid).toBeTruthy();
  });

  it('should navigate when form is valid', () => {
    component.ngOnInit();
    component.searchForm.patchValue({
      searchType: 'people',
      query: 'luke'
    });
    
    component.search();
    
    expect(mockRouter.navigate).toHaveBeenCalledWith([], {
      queryParams: { searchType: 'people', query: 'luke' }
    });
  });

  it('should not navigate when form is invalid', () => {
    component.ngOnInit();
    component.searchForm.patchValue({
      searchType: 'people',
      query: '' // Invalid - required field empty
    });
    
    component.search();
    
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should update form based on route params', () => {
    mockActivatedRoute.queryParams = of({ searchType: 'planets', query: 'tatooine' });
    component.ngOnInit();
    
    expect(component.searchForm.get('searchType')?.value).toBe('planets');
    expect(component.searchForm.get('query')?.value).toBe('tatooine');
  });

  it('should be able to select planet radio', () => {
    component.ngOnInit();
    component.searchForm.patchValue({ searchType: 'planets' });
    fixture.detectChanges();
    
    expect(component.searchForm.get('searchType')?.value).toBe('planets');
  });

  it('should be able to select character radio', () => {
    component.ngOnInit();
    component.searchForm.patchValue({ searchType: 'people' });
    fixture.detectChanges();
    
    expect(component.searchForm.get('searchType')?.value).toBe('people');
  });

  it('should handle very long query strings', () => {
    component.ngOnInit();
    const longQuery = 'a'.repeat(1000); // Very long string
    component.searchForm.patchValue({
    searchType: 'people',
    query: longQuery
  });
  
  component.search();
  
  expect(mockRouter.navigate).toHaveBeenCalledWith([], {
    queryParams: { searchType: 'people', query: longQuery }
  });
}); 

it('should handle null/undefined route params gracefully', () => {
  mockActivatedRoute.queryParams = of({ searchType: null, query: undefined });
  
  expect(() => component.ngOnInit()).not.toThrow();
  expect(component.searchForm.get('searchType')?.value).toBe('people'); // Falls back to default
  expect(component.searchForm.get('query')?.value).toBe(''); // Falls back to empty
});

it('should handle special characters in query', () => {
  component.ngOnInit();
  component.searchForm.patchValue({
    searchType: 'people',
    query: '@#$%^&*()[]{}|\\:";\'<>?,./'
  });
  
  component.search();
  
  expect(mockRouter.navigate).toHaveBeenCalledWith([], {
    queryParams: { searchType: 'people', query: '@#$%^&*()[]{}|\\:";\'<>?,./' }
  });
});
});