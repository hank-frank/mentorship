import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MentorComponent } from './mentor/mentor.component';
import { MenteeComponent } from './mentee/mentee.component';
import { HeaderComponent } from './header/header.component';
import { PieChartComponent } from './dashboard/pie-chart/pie-chart.component';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { TableComponent } from './dashboard/table/table.component';
import { MentorshipHttpInterceptor } from './mentorship-http-interceptor';
import { HtmlTableDirective } from './directives/html-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MentorComponent,
    MenteeComponent,
    HeaderComponent,
    PieChartComponent,
    BarChartComponent,
    TableComponent,
    HtmlTableDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgxDatatableModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  providers: [
    AppComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MentorshipHttpInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
