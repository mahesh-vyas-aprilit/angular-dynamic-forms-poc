import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:54321/';
  }

  public httpGet(uri: string, options?: any) {
    const url = this.baseUrl + uri;
    return this.http.get(url, { observe: 'response' }).pipe(
      map((response) => {
        if (response.status === 200) {
          return response.body;
        } else {
          return this.handleError(response, uri);
        }
      }),
      catchError((error: any) => {
        throw this.handleError(error, uri);
      })
    );
  }

  public httpPut(uri: string, data: any, options?: any) {
    const url = this.baseUrl + uri;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');
    return this.http.put(url, data, { headers, observe: 'response' }).pipe(
      map(
        (response) => {
          if (response.ok) {
            try {
              return response.body;
            } catch (err) {
              return response;
            }
          }
          return this.handleError(response, url);
        },
        (error: any) => {
          return this.handleError(error, uri);
        }
      ),
      catchError((error: any) => {
        throw this.handleError(error, uri);
      })
    );
  }

  public httpPost(uri: string, data: any, options?: any) {
    const url = this.baseUrl + uri;
    const headers = new HttpHeaders();
    headers.append('Accept', '*/*');

    return this.http.post(url, data, { headers, observe: 'response' }).pipe(
      map((response) => {
        if (response.ok) {
          try {
            return response.body;
          } catch (err) {
            throw response;
          }
        }
        throw this.handleError(response, url);
      }),
      catchError((error: any) => {
        throw this.handleError(error, uri);
      })
    );
  }

  public httpDelete(uri: string, data: any, options?: any) {
    const url = this.baseUrl + uri;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers.append('Accept', 'application/json');

    return this.http
      .delete(url, { headers, observe: 'response', body: data })
      .pipe(
        map(
          (response) => {
            if (response.ok) {
              try {
                return response.body;
              } catch (err) {
                return response;
              }
            }
            return this.handleError(response, url);
          },
          (error: any) => {
            return this.handleError(error, uri);
          }
        ),
        catchError((error: any) => {
          throw this.handleError(error, uri);
        })
      );
  }

  private handleError(error: any, uri: string) {
    throw error;
  }
}
