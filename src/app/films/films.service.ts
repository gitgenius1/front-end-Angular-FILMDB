import { Injectable } from '@angular/core';
import { Films } from './Films';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  films: any = []
  searchedFilms: any = []
  deleteStatus: String = "";

  constructor(private http: HttpClient) { }
  getAllFilms(): Observable<Films[]> {
    return this.http.get<Films[]>("http://localhost:8080/luis_filmdb/filmdb/all").pipe(
      map((film) => this.films = film)
    );
  }
  getFilm(id: number): Observable<Films> {
    return this.http.get<Films>("http://localhost:8080/luis_filmdb/filmdb/film/" + id);
  }
  searchFilm(title: string): Observable<Films[]> {
    return this.http.get<Films[]>("http://localhost:8080/luis_filmdb/filmdb/search?title=" + title).pipe(
      map((film) => this.searchedFilms = film)
    );
  }
  deleteFilm(id: number): Observable<string> {
    return this.http.delete<string>("http://localhost:8080/luis_filmdb/filmdb/delete?id=" + id)
  }

  updateFilm(film: Films): Observable<string> {
    return this.http.put<string>("http://localhost:8080/luis_filmdb/filmdb/update", JSON.parse( JSON.stringify(film)))
  }

  insertFilm(film: any): Observable<string> {
    console.log(film)
    return this.http.post<string>("http://localhost:8080/luis_filmdb/filmdb/insert",JSON.parse( JSON.stringify(film)))
  }
}
