import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  url = 'http://localhost:3000/api/heroes/';

  constructor(private http: HttpClient) { }


  getHeroes(): any {
    console.log('trying in service')
    return this.http.get(this.url)
  }
  addHero(name): any {
    const body = { name: name };
    return this.http.post(this.url, body)
  }
  updateHero(_id, name): any {
    const body = { _id: _id, name: name };
    return this.http.put(this.url, body)
  }
  deleteHero(hero): any {

    return this.http.delete(this.url + hero._id, hero._id)
  }
  getHero(id): any {

    return this.http.get(this.url + id)
  }
}
