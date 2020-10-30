import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { ErsUserPrincipal } from '../models/ErsUserPrincipal'
import { map } from 'rxjs/operators';
import { ErsUserDTO } from '../dtos/ErsUserDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<ErsUserPrincipal>;
  currentUser$: Observable<ErsUserPrincipal>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<ErsUserPrincipal>(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  authenticate(username: string, password: string) {

    return this.http.post(`http://localhost:5000/authenticate`, {username, password}, {

      headers: {
        'Content-type': 'application/json'
      },
      observe: 'response'

    }).pipe(

      map(resp => {
        let principal = resp.body as ErsUserPrincipal;
        console.log(principal);
        this.currentUserSubject.next(principal);
      })

    );

  }



}
