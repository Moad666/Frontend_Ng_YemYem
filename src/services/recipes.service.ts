import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private httpClient : HttpClient) { }
  private baseUrl = "http://127.0.0.1:8000/api";

  getResipesList() : Observable<Recipe[]>{
    return this.httpClient.get<Recipe[]>(`${this.baseUrl}/list_recipe/`);
  }

  createRecipe(recipe : Recipe): Observable<Object>{
    return this.httpClient.post(`${this.baseUrl}/create_recipe/`, recipe);
    }

    deleteRecipe(id:number | undefined) : Observable<Object>{
      return this.httpClient.delete(`${this.baseUrl}/recipes/${id}/`);
      }
}
