import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from 'src/models/recipe';
import { RecipesService } from 'src/services/recipes.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

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

  ngSubmit(){
    this.createRecipe();
  }
  createRecipe(){
    this.recipeService.createRecipe(this.recipe).subscribe(data=>{
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: 'Recipe Created Successfully!',
        showConfirmButton: true,
        confirmButtonText: 'OK'
      }).then((result)=>{
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    });
      }

      deleteRecipe(id : number|undefined){
        this.recipeService.deleteRecipe(id).subscribe(data =>{
          console.log(data);
          window.location.reload();
        });
      }




}
