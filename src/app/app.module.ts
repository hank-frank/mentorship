import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorComponent } from './mentor/mentor.component';
import { MenteeComponent } from './mentee/mentee.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MentorComponent,
    MenteeComponent,
    HeaderComponent,
    PieChartComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  providers: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
