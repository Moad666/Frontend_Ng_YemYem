import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupDialogComponent } from './signup-dialog/signup-dialog.component';
import { AppComponent } from './app.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path : "signupDialog", component : SignupDialogComponent},
  {path : "loginDialog", component : LoginDialogComponent},
  {path : "about", component : AboutComponent},
  {path : "", component : HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
