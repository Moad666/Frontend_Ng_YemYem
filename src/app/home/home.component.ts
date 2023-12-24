import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipesService } from 'src/services/recipes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{


  constructor(private recipeService : RecipesService,private router : Router){}
  recipes : Recipe[] | undefined;
  recipe : Recipe = new Recipe();

  private getRecipes(){
    this.recipeService.getResipesList().subscribe(data => {
    this.recipes = data;
    });
  }

  ngOnInit(): void {
    this.getRecipes();
  }



}
