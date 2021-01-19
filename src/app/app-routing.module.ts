import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MentorComponent } from './mentor/mentor.component';
import { MenteeComponent } from './mentee/mentee.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'mentor', component: MentorComponent },
  { path: 'mentee', component: MenteeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
