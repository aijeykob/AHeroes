import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  providers: [HeroService]
})

export class HeroesComponent implements OnInit {
  constructor(private heroService: HeroService) { }

  heroes;
  error: any;
  ngOnInit() {
    this.getHeroes();
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(
        heroes => this.heroes = heroes,
        error => { this.error = error.message; console.log(error); }
      );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero(name)
      .subscribe(hero => { this.heroes.push(hero); },
        error => { this.error = error.message; console.log(error); }
      )
  }

  delete(hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe(
      error => { this.error = error.message; console.log(error); }
    );
  }

}