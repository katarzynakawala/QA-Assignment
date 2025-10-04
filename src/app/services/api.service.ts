import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'https://swapi.tech/api/';

@Injectable()
export class ApiService {

  constructor(
    private httpClient: HttpClient
  ) {}

  search(searchType, query): Observable<any> {
    const params = new HttpParams()
      .set('name', query);

    return this.httpClient
      .get(
        `${baseUrl}${searchType}/`,
        {params}
      );
  }

  // Method for contract testing that includes HTTP status
  searchWithResponse(searchType, query): Observable<HttpResponse<any>> {
    const params = new HttpParams()
      .set('name', query);

    return this.httpClient
      .get(
        `${baseUrl}${searchType}/`,
        { params, observe: 'response' }  // This returns the full HTTP response
      );
  }

}
