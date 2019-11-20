import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit, OnDestroy {
  hero: Hero;
  error;
  id;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      console.log(this.id)
      this.initHero(this.id);
    });

  }

  initHero(id): void {

    this.heroService.getHero(id)
      .subscribe(
        hero => {
          this.hero = hero
        }
        ,
        error => { this.error = error.message; console.log(error); }
      );
  }


  goBack(): void {
    this.location.back();
  }
  update(_id, name): void {
    this.heroService.updateHero(_id, name)
      .subscribe(hero => { this.goBack() },
        error => { this.error = error.message; console.log(error); }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}