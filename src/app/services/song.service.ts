import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; // Import environment variables

@Injectable({
  providedIn: 'root',
})
export class SongService {
  private apiUrl = 'https://spotify23.p.rapidapi.com/search';

  constructor(private http: HttpClient) {}

  getSpotifyData(query: string, type: string): Observable<any> {
    // Set headers
    const headers = new HttpHeaders({
      'X-RapidAPI-Key': environment.rapidApiKey, // Use environment variable
      'X-RapidAPI-Host': 'spotify23.p.rapidapi.com',
    });

    // Set query parameters
    const params = new HttpParams()
      .set('q', query)
      .set('type', type) // Dynamically set search type ('albums' or 'playlists')
      .set('offset', '0')
      .set('limit', '20')
      .set('numberOfTopResults', '5');

    // Make GET request
    return this.http.get<any>(this.apiUrl, { headers, params });
  }
}
